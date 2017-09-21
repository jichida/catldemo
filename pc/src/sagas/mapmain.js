import { select,put,call,take,takeEvery,takeLatest,cancel,fork,join,throttle } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  md_mapmain_setzoomlevel,
  mapmain_setzoomlevel,
  mapmain_setmapcenter,
  map_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  mapmain_setenableddrawmapflag,
  querydevice_result,
  ui_selcurdevice_request,
  ui_selcurdevice_result,
  querydeviceinfo_request,
  querydeviceinfo_result,
  ui_showmenu,
  ui_showdistcluster,
  ui_showhugepoints,
  mapmain_seldistrict,
  mapmain_seldistrict_init,
  mapmain_getdistrictresult,
  mapmain_init_device,
  ui_settreefilter,
  md_ui_settreefilter,
  serverpush_devicegeo,
  serverpush_devicegeo_sz,
  devicelistgeochange_distcluster,
  devicelistgeochange_pointsimplifierins,
  devicelistgeochange_geotreemenu,
  devicelistgeochange_geotreemenu_refreshtree,
  mapmain_areamountdevices_request,
  mapmain_areamountdevices_result,

  searchbattery_result,
  ui_searchbattery_result,
  ui_mycar_showtype,
  ui_alarm_selcurdevice,
  ui_mycar_selcurdevice,
  ui_index_selstatus,
  ui_selworkorder,
  ui_sel_tabindex,

  ui_changemodeview
} from '../actions';
import async from 'async';
import {getgeodatabatch,getgeodata} from './mapmain_getgeodata';
import {getcurrentpos} from './getcurrentpos';
import { push,replace } from 'react-router-redux';
import L from 'leaflet';
import _ from 'lodash';
import moment from 'moment';
import coordtransform from 'coordtransform';
import {getadcodeinfo} from '../util/addressutil';
import {getpopinfowindowstyle,getgroupStyleMap} from './getmapstyle';
import jsondataareas from '../util/areas.json';
import jsondataprovinces from '../util/provinces.json';
import jsondatacities from '../util/cities.json';

const divmapid_mapmain = 'mapmain';

let infoWindow;
const loczero = L.latLng(0,0);
let distCluster,pointSimplifierIns;
let groupStyleMap = {};


//=====数据部分=====
let g_devicesdb = {};
let gmap_acode_treecount = {};
let gmap_acode_devices = {};
let getmapzoollevel = (nowzoomlevel,oldzoomlevel)=>{
  console.log(`当前:${nowzoomlevel},上次:${oldzoomlevel}`);
  return nowzoomlevel;
  // if(nowzoomlevel >= oldzoomlevel){
  //   //放大
  //   if(nowzoomlevel <= 3){
  //     return 3;
  //   }
  //   if(nowzoomlevel <= 7){
  //     return 7;
  //   }
  //   if(nowzoomlevel <= 11){
  //     return 11;
  //   }
  //   if(nowzoomlevel <= 17){
  //     return nowzoomlevel;
  //   }
  // }
  // //缩小
  // if(nowzoomlevel >= 17){
  //   return 17;
  // }
  // if(nowzoomlevel >= 11){
  //   return nowzoomlevel;
  // }
  // if(nowzoomlevel >= 7){
  //   return 7;
  // }
  // if(nowzoomlevel >= 3){
  //   return 3;
  // }
  //
  // return 3;
}
//新建行政区域&海量点
const CreateMapUI_PointSimplifier =  (map)=>{
  return new Promise((resolve,reject) => {
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }
      window.AMapUI.load(['ui/misc/PointSimplifier',
    ],(PointSimplifier)=> {
           if (!PointSimplifier.supportCanvas) {
               alert('当前环境不支持 Canvas！');
               reject();
               return;
           }
           //分组样式
           let groupsz = getgroupStyleMap();
           _.map(groupsz,(group)=>{
             const {name,image,...rest} = group;
             groupStyleMap[name] = {
                pointStyle: {
                 content:PointSimplifier.Render.Canvas.getImageContent(
                     image, onIconLoad, onIconError),
                 ...rest
               }
             }
           });

           const onIconLoad = ()=> {
               pointSimplifierIns.renderLater();
           }

           const onIconError = (e)=> {
               alert('图片加载失败！');
           }
           //海量点控件
           pointSimplifierIns = new PointSimplifier({
               zIndex: 115,
               autoSetFitView: false,
               map: map, //所属的地图实例
               getPosition: (deviceitem)=> {
                   let itemnew = g_devicesdb[deviceitem.DeviceId];
                   if(!!itemnew){
                    //
                     return itemnew.locz;
                   }
                  //
                   return deviceitem.locz;
                   //return [LastHistoryTrack.Latitude,LastHistoryTrack.Longitude];
               },
               getHoverTitle: (deviceitem, idx)=> {
                   let imagetype = deviceitem.imagetype || 0;
                   if(typeof imagetype === 'string'){
                     imagetype = parseInt(imagetype);
                   }
                   if(imagetype >= 4 ){
                     return `充电桩编号:${deviceitem.DeviceId}`;
                   }
                   return `车辆编号:${deviceitem.DeviceId}`;
               },
               //使用GroupStyleRender
               renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
               renderOptions: {
                   //点的样式,海量点样式
                   pointStyle: {
                       width: 5,
                       height: 5,
                       fillStyle:'#A2D0FA'
                   },
                   getGroupId: (deviceitem, idx)=> {
                       let idex = parseInt(deviceitem.locz[0]) + parseInt(deviceitem.locz[1]);
                       let groupid = idex%3;

                       if(!!deviceitem.imagetype){
                         groupid = deviceitem.imagetype;
                       }
                       //这里显示图标
                       return groupid;
                   },
                   groupStyleOptions: (gid)=> {
                       return groupStyleMap[gid];
                   }

               }
           });
           resolve(pointSimplifierIns);
       });

   });
}

//新建行政区域
const CreateMapUI_DistrictCluster =  (map)=>{
  return new Promise((resolve,reject) => {
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }
      window.AMapUI.load(['ui/geo/DistrictCluster',
      'lib/utils',
      'lib/dom.utils',
      'ui/geo/DistrictCluster/lib/DistMgr',
    ],(DistrictCluster,utils, domUtils, DistMgr)=> {
           //<------------获取某个地点的Marker----------------
           const defaultgetClusterMarker = (feature, dataItems, recycledMarker)=> {
               //行政区域
               try{
                 let container, title, body;
                 const nodeClassNames = {
              				title: 'amap-ui-district-cluster-marker-title',
              				body: 'amap-ui-district-cluster-marker-body',
              				container: 'amap-ui-district-cluster-marker'
              			};
              			if (recycledMarker) {
              				container = recycledMarker.getContent();
              				title = domUtils.getElementsByClassName(nodeClassNames.title, 'span', container)[0];
              				body = domUtils.getElementsByClassName(nodeClassNames.body, 'span', container)[0];
              			} else {
                      container = document.createElement('div');
              				title = document.createElement('span');
              				title.className = nodeClassNames.title;
              				body = document.createElement('span');
              				body.className = nodeClassNames.body;
              				container.appendChild(title);
              				container.appendChild(body);
              			}

              			const props = feature.properties,
              			routeNames = [];
              			const classNameList = [nodeClassNames.container, 'level_' + props.level, 'adcode_' + props.adcode];
              			if (props.acroutes) {
              				const acroutes = props.acroutes;
              				for (let i = 0, len = acroutes.length; i < len; i++) {
              					classNameList.push('descendant_of_' + acroutes[i]);
              					if (i === len - 1) {
              						classNameList.push('child_of_' + acroutes[i]);
              					}
              					if (i > 0) {
              						routeNames.push(DistMgr.getNodeByAdcode(acroutes[i]).name);
              					}
              				}
              			}
              			container.className = classNameList.join(' ');
              			if (routeNames.length > 0) {
              				routeNames.push(props.name);
              				container.setAttribute('title', routeNames.join('>'));
              			} else {
              				container.removeAttribute('title');
              			}
                    if(!!title){
                      title.innerHTML = utils.escapeHtml(props.name);
                    }
              			if(!!body){
                      body.innerHTML = dataItems.length;
                    }

              			const resultMarker = recycledMarker || new window.AMap.Marker({
              				topWhenClick: true,
              				offset: new window.AMap.Pixel(-20, -30),
              				content: container
              			});
              			return resultMarker;
               }
               catch(e){

               }
          	    return null;
        		}
            //重写行政区域,避免来回刷新时的闪烁
             utils.extend(DistrictCluster.prototype,
               {//重新设置数据时不刷新Marker
                   setDataWithoutClear: function(data) {
                      //
                      data || (data = []);
                      this.trigger("willBuildData", data);
                      this._data.source = data;
                      //  this._data.bounds = BoundsItem.getBoundsItemToExpand();
                      this._buildDataItems(data);
                      this._buildKDTree();
                      this._distCounter.setData(this._data.list);
                      this.trigger("didBuildData", data);
                      this.renderLater(10);
                      data.length && this._opts.autoSetFitView && this.setFitView();
                    },
              });
             distCluster = new DistrictCluster({
                 zIndex: 100,
                 map: map, //所属的地图实例
                 autoSetFitView:false,
                 getPosition: (deviceitem)=> {
                     return deviceitem.locz;
                 },
                 renderOptions:{
                   featureStyleByLevel:{
                      country: {
                        fillStyle: 'rgba(169, 217, 85, 0.8)'
                      },
                      province: {
                        fillStyle: 'rgba(116, 196, 118, 0.7)'
                      },
                      city: {
                        fillStyle: 'rgba(161, 217, 155, 0.6)'
                      },
                      district: {
                        fillStyle: 'rgba(199, 233, 192, 0.5)'
                      }
                  },
                  //  featureClickToShowSub:true,
                   clusterMarkerRecycleLimit:1000,
                   clusterMarkerKeepConsistent:false,
                   getClusterMarker : (feature, dataItems, recycledMarker)=> {
                      if(dataItems.length > 0){
                        return defaultgetClusterMarker(feature, dataItems, recycledMarker);
                      }
                      return null;
                    }
                 }
             });
             resolve(distCluster);
       });

   });
}

//新建地图
let CreateMap =({mapcenterlocation,zoomlevel})=> {

  return new Promise((resolve,reject) => {
    if(!mapcenterlocation.equals(loczero) && !window.amapmain ){
      let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
      window.amapmain = new window.AMap.Map(divmapid_mapmain, {
            center: center,
            zoom:zoomlevel,
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
        });

        window.AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
        ()=>{
          const scale = new window.AMap.Scale({
                visible: true
            });
          const  toolBar = new window.AMap.ToolBar({
                visible: true
            });
          const  overView = new window.AMap.OverView({
                visible: true
            });
            window.amapmain.addControl(scale);
            window.amapmain.addControl(toolBar);
            window.amapmain.addControl(overView);
            resolve(window.amapmain);
        });

      }
      else{
        if(!!window.amapmain){
          resolve(window.amapmain);
          return;
        }
        reject(`地图参数${mapcenterlocation.lng},${mapcenterlocation.lat},amap:${!!window.amapmain}`);
      }
  });
}

//监听地图事件
const listenmapevent = (eventname)=>{
  return new Promise(resolve => {
    if(!!window.amapmain){
      window.amapmain.on(eventname, (e)=> {
          resolve(eventname);
      });
    }
  });
}

//监听标记事件
const listenmarkclickevent = (eventname)=>{
  return new Promise(resolve => {
    pointSimplifierIns.on(eventname, (e,record)=> {
        resolve(record);
    });
  });
}

//监听弹框事件
const listenwindowinfoevent = (eventname)=>{
  return new Promise(resolve => {
    infoWindow.on(eventname, (e)=> {
        resolve(eventname);
    });
  });
}

//监听行政事件,clusterMarkerClick
const listenclusterevent = (eventname)=>{
  return new Promise(resolve => {
    distCluster.on(eventname, (e,record)=> {
        distCluster.getClusterRecord(record.adcode,(err,result)=>{
          if(!err){
            const {adcode,name,dataItems,hangingDataItems,children} = result;
            if(!!dataItems){
              if(dataItems.length > 0){
                  resolve({adcodetop:record.adcode,forcetoggled:true});
                  return;
              }
            }
          }
          resolve();
        });
    });
  });
}

//获取reduce


//显示弹框


const showinfowindow = (deviceitem)=>{
  return new Promise((resolve,reject) =>{
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }
      let locz = deviceitem.locz;
      window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
          infoWindow = new SimpleInfoWindow(getpopinfowindowstyle(deviceitem));
          if(!!locz){
            window.amapmain.setCenter(locz);
            infoWindow.open(window.amapmain, locz);
          }
          else{
            infoWindow.open(window.amapmain, window.amapmain.getCenter());
          }
          resolve(infoWindow);
      });
  });
}

//获取根结点的数据
const getclustertree_root =()=>{
  const adcodetop=100000;
  return new Promise((resolve,reject) => {
    if(!distCluster){
      reject();
      return;
    }
    distCluster.getClusterRecord(adcodetop,(err,result)=>{
      if(!err){
        const {children,dataItems} = result;
        if(!children || children.length === 0){
          reject();
        }
        if(!dataItems || dataItems.length === 0){
          reject();
          return;
        }
        gmap_acode_treecount[adcodetop]=dataItems.length;//全国

        let childadcodelist = [];
        _.map(children,(child)=>{
          if(child.dataItems.length > 0){
            childadcodelist.push(child.adcode);
            gmap_acode_treecount[child.adcode]=child.dataItems.length;
          }
          else{
            gmap_acode_treecount[child.adcode]=0;
          }
        });
        resolve(childadcodelist);
      }
      else{
        reject(err);
      }
    });
  });
}
//获取某个行政区域的数据
const getclustertree_one =(adcode)=>{
  return new Promise((resolve,reject) => {
    if(!distCluster){
      reject();
      return;
    }
    distCluster.getClusterRecord(adcode,(err,result)=>{
      if(!err){
        const {adcode,dataItems,children} = result;
        if(!children || children.length === 0){
          //device
          let deviceids = [];
          if(!!dataItems){
            _.map(dataItems,(deviceitem)=>{
              if(!!deviceitem.dataItem){
                deviceids.push(deviceitem.dataItem.DeviceId);
              }
            });
          }
          gmap_acode_treecount[adcode]=deviceids.length;
          gmap_acode_devices[adcode]=deviceids;
          resolve({
            type:'device',
            deviceids
          });
        }
        else{
          //group
          let childadcodelist = [];
          if(!dataItems || dataItems.length === 0){
            gmap_acode_treecount[adcode]=0;
            resolve({
              type:'group',
              childadcodelist
            });
            return;
          }
          gmap_acode_treecount[adcode]=dataItems.length;
          _.map(children,(child)=>{
              if(child.dataItems.length > 0){
                gmap_acode_treecount[child.adcode]=child.dataItems.length;
                childadcodelist.push(child.adcode);
              }
              else{
                gmap_acode_treecount[child.adcode]=0;
              }

          });
          resolve({
            type:'group',
            childadcodelist
          });
        }
      }
      else{
        reject(err);
      }
    });
  });
}

//地图主流程
export function* createmapmainflow(){

    //创建地图
    yield takeLatest(`${carmapshow_createmap}`, function*(action_createmap) {
      try{
        let {payload:{divmapid}} = action_createmap;
        if(divmapid === divmapid_mapmain){
          //wait js script loaded
          // while(!window.AMap){
          //   console.log(`wait here...${!!window.AMap},ui:${!!window.AMapUI}`);
          //   yield call(delay,500);
          // }
          console.log(`js script init`);
          //take
          let mapcarprops = yield select((state) => {
            const {carmap} = state;
            return {...carmap};
          });
          if(!mapcarprops.isMapInited){//仅在第一次加载页面初始化时进入
            //等待地图初始化
            console.log(`wait for mapcarprops.isMapInited`);
            yield take(`${map_setmapinited}`);
          }

          console.log(`start create map`);
          let {mapcenterlocation,zoomlevel} = mapcarprops;
          if(mapcenterlocation.equals(loczero)){//仅在第一次加载页面初始化时进入
            const centerpos = yield call(getcurrentpos);
            mapcenterlocation = L.latLng(centerpos.lat, centerpos.lng);
          }
          yield call(CreateMap,{mapcenterlocation,zoomlevel});//创建地图

          yield call(CreateMapUI_PointSimplifier,window.amapmain);
          yield call(CreateMapUI_DistrictCluster,window.amapmain);

          let listentask =  yield fork(function*(eventname){
            while(true){
              let result = yield call(listenclusterevent,eventname);
              if(!!result){
                yield put(mapmain_seldistrict(result));
              }
              // yield put(clusterMarkerClick(result));
            }
          },'clusterMarkerClick');

          let task_dragend =  yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              let centerlocation = window.amapmain.getCenter();
              let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
              yield put(mapmain_setmapcenter(centerlatlng));
            }
          },'dragend');

          let task_zoomend =  yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              // let centerlocation = window.amapmain.getCenter();
              // let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
              yield put(md_mapmain_setzoomlevel(window.amapmain.getZoom()));
            }
          },'zoomend');

          let task_markclick = yield fork(function*(eventname){
            while(true){
                const dataitem = yield call(listenmarkclickevent,eventname);
                if(!!dataitem){
                  let deviceitem = dataitem.data;

                  if(!!deviceitem){
                    yield put(ui_selcurdevice_request({DeviceId:deviceitem.DeviceId,deviceitem}));
                  }
                }
              //
            }
          },'pointClick');//'pointClick pointMouseover pointMouseout'

          let task_mapclick = yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              console.log(`click map!!!`);
              if(!!infoWindow){
                infoWindow.close();
              }
            }
          },'click');//'click'

          //如果已经登录,并且有数据了！，重新加载数据
          let deivcelist = [];
          _.map(g_devicesdb,(v)=>{
            deivcelist.push(v);
          });
          if(deivcelist.length > 0){
            yield put(querydevice_result({list:deivcelist}));
          }
          //监听事件
          //  pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function(e, record) {
          //listentask task_dragend task_zoomend task_markclick task_mapclick
          //  })
          while(true){
            let {payload:{divmapid}} = yield take(`${carmapshow_destorymap}`);
            if(divmapid === divmapid_mapmain){
              break;
            }
          }
          yield cancel(listentask);
          yield cancel(task_dragend);
          yield cancel(task_zoomend);
          yield cancel(task_markclick);
          yield cancel(task_mapclick);
        }
      }
      catch(e){
        console.log(e);
      }

    });

    yield takeLatest(`${ui_changemodeview}`, function*(action) {
      if(!!infoWindow){
        infoWindow.close();
      }
    });
    //销毁地图
    yield takeLatest(`${carmapshow_destorymap}`, function*(action_destorymap) {
      let {payload:{divmapid}} = action_destorymap;
      if(divmapid === divmapid_mapmain){
        window.amapmain = null;
        infoWindow=null;
        distCluster=null;
        pointSimplifierIns=null;
      }
    });

    //选择一个车辆请求
    yield takeLatest(`${ui_selcurdevice_request}`,function*(actioncurdevice){
      const {payload:{DeviceId,deviceitem}} = actioncurdevice;
      try{
            //强制展开树
            //获取该车辆所在经纬度
            const result = yield call(getgeodata,deviceitem);
            //调用一次citycode，防止加载不到AreaNode
            try{
              let adcodeinfo = getadcodeinfo(result.adcode);
              yield call(getclustertree_one,adcodeinfo.parent_code);
            }
            catch(e){

            }
            const adcodetop = parseInt(result.adcode);
            //展开左侧树结构
            yield put(mapmain_seldistrict({adcodetop,forcetoggled:true}));
            yield take(`${mapmain_getdistrictresult}`);//等待数据完成

      }
      catch(e){

      }
      yield put(ui_selcurdevice_result(actioncurdevice.payload));
    });

    //选择一个车辆
    yield takeLatest(`${ui_selcurdevice_result}`,function*(actioncurdevice){
      try{
          const {payload:{DeviceId,deviceitem}} = actioncurdevice;

          //获取该车辆信息
          yield put(querydeviceinfo_request({query:{DeviceId}}));
          const {payload} = yield take(`${querydeviceinfo_result}`);
          g_devicesdb[DeviceId] = payload;
          //弹框
          yield call(showinfowindow,payload);

          yield fork(function*(eventname){
           //while(true){//关闭时触发的事件
             yield call(listenwindowinfoevent,eventname);//触发一次
            //  yield put(ui_showmenu("showdevice_no"));
             infoWindow = null;
           //}
          },'close');
          // yield put(ui_showmenu("showdevice"));

        }
        catch(e){

        }
    });

    //查询所有车辆返回
    yield takeLatest(`${querydevice_result}`, function*(deviceresult) {
      let {payload:{list:devicelist}} = deviceresult;
      try{
          while(!pointSimplifierIns || !distCluster){
            yield call(delay,2500);
          }
          //批量转换一次
          g_devicesdb = {};//清空，重新初始化
          let devicelistresult = yield call(getgeodatabatch,devicelist);
          const data = [];
          _.map(devicelistresult,(deviceitem)=>{
            if(!!deviceitem.locz){
              data.push(deviceitem);
              g_devicesdb[deviceitem.DeviceId] = deviceitem;
            }
          });

          distCluster.setData(data);
          pointSimplifierIns.setData(data);

          //初始化清空
          gmap_acode_devices={};
          gmap_acode_treecount={};

          const childadcodelist = yield call(getclustertree_root);
          yield put(mapmain_init_device({g_devicesdb,gmap_acode_devices,gmap_acode_treecount}));

          if(window.amapmain.getZoom() > 12){
            yield put(ui_showhugepoints(true));
            yield put(ui_showdistcluster(false));
          }
          else{
            yield put(ui_showhugepoints(false));
            yield put(ui_showdistcluster(true));
          }

        }
        catch(e){

        }

    });

    //显示地图区域
    yield takeLatest(`${md_mapmain_setzoomlevel}`, function*(action_showflag) {
      try{
        let {payload:zoomlevel} = action_showflag;
        let oldzoomlevel = yield select((state)=>{
          return state.carmap.zoomlevel;
        });
        if(zoomlevel !== oldzoomlevel){
          zoomlevel = getmapzoollevel(zoomlevel,oldzoomlevel);
          if(!!window.amapmain){
            window.amapmain.setZoom(zoomlevel);
          }
          console.log(`结果:${zoomlevel}`)
          if(zoomlevel > 12){
            yield put(ui_showhugepoints(true));
            yield put(ui_showdistcluster(false));
          }
          else{
            yield put(ui_showhugepoints(false));
            yield put(ui_showdistcluster(true));
          }
          yield put(mapmain_setzoomlevel(zoomlevel));
        }
        else{
          console.log(`两次zoom相同,都是:${zoomlevel}`)
        }

      }
      catch(e){
        console.log(e);
      }

    });


    yield takeLatest(`${ui_showdistcluster}`, function*(action_showflag) {
        let {payload:isshow} = action_showflag;
        try{
          if(!!distCluster){
            if(isshow){
              distCluster.show();
            }
            else{
              distCluster.hide();
            }
            distCluster.render();
          }
        }
        catch(e){

        }
    });
    //显示海量点
    yield takeLatest(`${ui_showhugepoints}`, function*(action_showflag) {
        let {payload:isshow} = action_showflag;
        try{
          if(!!distCluster){
            if(isshow){
              pointSimplifierIns.show();
            }
            else{
              pointSimplifierIns.hide();
            }
            pointSimplifierIns.render();
          }
        }
        catch(e){

        }
    });

    //选中某个区域
    yield takeLatest(`${mapmain_seldistrict}`, function*(action_district) {
        let {payload:{adcodetop,forcetoggled}} = action_district;
        try{
          if(!!adcodetop){
            //========================================================================================
            let isarea = false;
            //获取该区域的数据
            const result = yield call(getclustertree_one,adcodetop);
            if(!!result){
              if(result.type === 'device'){
                isarea = true;
                //如果返回车辆,则将车辆加载到树中
                yield put(mapmain_areamountdevices_result({adcode:adcodetop,gmap_acode_devices,g_devicesdb,gmap_acode_treecount}));
              }
              else{
                //刷新树中的数据
                yield put(devicelistgeochange_geotreemenu_refreshtree({g_devicesdb,gmap_acode_devices,gmap_acode_treecount}));
              }
            }

            if(!!distCluster){//放大到该区域
              if(isarea && !!gmap_acode_devices[adcodetop]){
                //定位10个
                const sample_size = 10;
                const samplesz = gmap_acode_devices[adcodetop].length > sample_size?
                _.sampleSize(gmap_acode_devices[adcodetop],sample_size):gmap_acode_devices[adcodetop];

                let latlngs = [];
                  _.map(samplesz,(deviceid)=>{
                      const deviceitem = g_devicesdb[deviceid];
                      if(!!deviceitem){
                        latlngs.push([deviceitem.locz[1],deviceitem.locz[0]]);
                      }
                  });

                  if(latlngs.length > 0){
                    //  let polyline = L.polyline(latlngs);
                    //  let lBounds = polyline.getBounds();//LatLngBounds
                    //  let southWest = new window.AMap.LngLat(lBounds.getSouthWest().lng,lBounds.getSouthWest().lat);
                    //  let northEast = new window.AMap.LngLat(lBounds.getNorthEast().lng,lBounds.getNorthEast().lat);
                    //  let amapboounds = new window.AMap.Bounds(southWest,northEast);
                    //  window.amapmain.setBounds(amapboounds);
                    let center = new window.AMap.LngLat(latlngs[0][1],latlngs[0][0]);
                     window.amapmain.setZoomAndCenter(window.amapmain.getZoom()+1,center);
                  }

              }
              else{
                distCluster.zoomToShowSubFeatures(adcodetop);
              }
            }


          }
        }
        catch(e){
          console.log(e);
        }

        //在树中将其他结点搜索，该节点展开
        yield put(mapmain_getdistrictresult({adcode:adcodetop,forcetoggled}));

    });

    //查询某车辆条件（待查）
    yield takeLatest(`${md_ui_settreefilter}`,function*(action){
      //https://redux-saga.js.org/docs/recipes/
      try{
        const {payload} = action;
        let delaytime = 0;
        let treefilter = payload;
        if(!!treefilter){
            delaytime = 500;
        }
        yield call(delay, delaytime);
        yield put(ui_settreefilter(payload));
      }
      catch(e){

      }
    });
    //serverpush_devicegeo

    //某个车辆地理位置发送变化
    yield takeLatest(`${serverpush_devicegeo}`,function*(action){
      //https://redux-saga.js.org/docs/recipes/
      const {payload} = action;
      let deviceitem = payload;
      try{
        g_devicesdb[deviceitem.DeviceId] = deviceitem;
        yield put(devicelistgeochange_distcluster({}));
        yield put(devicelistgeochange_pointsimplifierins({}));
        yield put(devicelistgeochange_geotreemenu({}));
      }
      catch(e){

      }
    });

    //多个车辆地理位置变化【刷新界面】
    yield takeLatest(`${serverpush_devicegeo_sz}`,function*(action){
      //https://redux-saga.js.org/docs/recipes/
      const {payload} = action;
      let {list} = payload;
      try{
        _.map(list,(deviceitem)=>{
          g_devicesdb[deviceitem.DeviceId] = deviceitem;
        });

        if(!!infoWindow){//正在弹窗
          //判断当前车辆是否发生偏移
          const {mapseldeviceid} = yield select((state)=>{
            return {mapseldeviceid:state.device.mapseldeviceid};
          });
          const deviceitem = _.find(list,((o)=>{
            return o.DeviceId === mapseldeviceid;
          }));
          if(!!deviceitem){
            // console.log(`当前车辆发生了变化:${JSON.stringify(deviceitem)}`)
            //请求
            yield put(querydeviceinfo_request({query:{DeviceId:mapseldeviceid}}));
            const {payload} = yield take(`${querydeviceinfo_result}`);
            //地理位置
            let deviceinfo = {...deviceitem,...payload};
            // const addr = yield call(getgeodata,deviceinfo);
            // deviceinfo = {...deviceinfo,...addr};
            // g_devicesdb[mapseldeviceid] = deviceinfo;

            let locz = deviceinfo.locz;
            // console.log(`开始移动==>${JSON.stringify(locz)}`)
            const infooptions = getpopinfowindowstyle(deviceinfo);
            infoWindow.setInfoTitle(infooptions.infoTitle);
            infoWindow.setInfoBody(infooptions.infoBody);
            infoWindow.setPosition(locz);
            window.amapmain.setCenter(locz);
          }
        }
        //
        yield put(devicelistgeochange_distcluster({}));
        yield put(devicelistgeochange_pointsimplifierins({}));
        yield put(devicelistgeochange_geotreemenu({}));
      }
      catch(e){

      }
    });
    //devicelistgeochange
    // yield throttle(1300,`${devicelistgeochange_distcluster}`,function*(action){
    yield takeLatest(`${devicelistgeochange_distcluster}`,function*(action){
      try{
        if(!!distCluster){
          let data = [];
          _.map(g_devicesdb,(item)=>{
            data.push(item);
          });
          distCluster.setDataWithoutClear(data);//无闪烁刷新行政区域个数信息
        }
      }
      catch(e){

      }
    });

    // yield throttle(1700,`${devicelistgeochange_pointsimplifierins}`,function*(action){
    yield takeLatest(`${devicelistgeochange_pointsimplifierins}`,function*(action){
      try{
        if(!!pointSimplifierIns){
          let data = [];
          _.map(g_devicesdb,(item)=>{
            data.push(item);
          });
          pointSimplifierIns.setData(data);//刷新海量点
        }
      }
      catch(e){

      }
    });

    //刷新行政区域树
    // yield throttle(1900,`${devicelistgeochange_geotreemenu}`,function*(action){
    yield takeLatest(`${devicelistgeochange_geotreemenu}`,function*(action){
      try{
        //获取当前树，当前选择展开的行政编码code，放数组中,循环设置
          //
          const childadcodelist = yield call(getclustertree_root);
          yield put(devicelistgeochange_geotreemenu_refreshtree({g_devicesdb,gmap_acode_devices,gmap_acode_treecount}));
          //

          const getdevicestate = (state)=>{
            const {datatreeloc} = state.device;
            return {datatreeloc};
          }
          let codelist = [];
          let curareaid;
          const {datatreeloc} = yield select(getdevicestate);
          const findexpandnode = (node)=>{
            let retnode;
            if(node.toggled){
              if(node.type === 'group_provice' || node.type === 'group_city' || node.type === 'group_area'){
                if(node.type === 'group_area'){
                  curareaid = node.adcode;
                }
                codelist.push(node.adcode);
              }
              retnode = node;
            }
            if(!!node.children){
              for(let i = 0; i<node.children.length ;i++){
                const subnode = node.children[i];
                let tmpnode = findexpandnode(subnode);
                if(!!tmpnode){
                  break;
                }
              }
            }
            return retnode;
          }
          findexpandnode(datatreeloc);
          //
          //==============
          let forkhandles = [];
          for(let i=0;i<codelist.length ;i++){
            const handlefork = yield fork(function*(adcode){
              const result = yield call(getclustertree_one,adcode);
            },codelist[i]);
            forkhandles.push(handlefork);
          };

          if(forkhandles.length > 0){
            yield join(...forkhandles);
          }

          //如果停留在区域,则重新装载车辆结点
          if(!!curareaid){
            yield put(mapmain_areamountdevices_result({adcode:curareaid,gmap_acode_devices,g_devicesdb}));
          }
          //刷新树中数据
          yield put(devicelistgeochange_geotreemenu_refreshtree({g_devicesdb,gmap_acode_devices,gmap_acode_treecount}));

          //
      }
      catch(e){
        console.log(e);
      }
    });

    //devicelistgeochange_geotreemenu
    yield takeLatest(`${searchbattery_result}`, function*(action) {
        try{
          const {payload:{list}} = action;
          let devicelist = [];
          _.map(list,(device)=>{
            devicelist.push(device.DeviceId);
            g_devicesdb[device.DeviceId] = device;
          });
          yield put(ui_searchbattery_result({g_devicesdb,devicelist}));
        }
        catch(e){
          console.log(e);
        }
    });


    //ui_mycarselcurdevice_request
    yield takeLatest(`${ui_mycar_selcurdevice}`, function*(action) {
      //地图模式选择车辆
      try{
        let {payload:DeviceId} = action;
        // if(typeof DeviceId === 'string'){
        //   DeviceId = parseInt(DeviceId);
        // }
        //先定位到地图模式,然后选择车辆
        let deviceitem = g_devicesdb[DeviceId];
        console.log(`${deviceitem}`)
        yield put(ui_mycar_showtype(0));
        if(!!deviceitem){
          yield put(ui_selcurdevice_request({DeviceId,deviceitem}));
        }

      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${ui_alarm_selcurdevice}`, function*(action) {
      //预警模式选择车辆
      try{
        //切换到首页
        let {payload:DeviceId} = action;
        // if(typeof DeviceId === 'string'){
        //   DeviceId = parseInt(DeviceId);
        // }
        //先定位到地图模式,然后选择车辆
        let deviceitem = g_devicesdb[DeviceId];
        console.log(`${deviceitem}`)
        yield put(ui_sel_tabindex(0));
        yield put(replace('/index'));
        //选择第一个tab
        yield put(ui_index_selstatus(0));
        //选择车辆
        if(!!deviceitem){
          yield put(ui_selcurdevice_request({DeviceId,deviceitem}));
        }
      }
      catch(e){
        console.log(e);
      }
    });


        yield takeLatest(`${ui_selworkorder}`, function*(action) {
          //预警模式选择车辆
          try{
            //切换到首页
            let {payload:DeviceId} = action;
            // if(typeof DeviceId === 'string'){
            //   DeviceId = parseInt(DeviceId);
            // }
            //先定位到地图模式,然后选择车辆
            let deviceitem = g_devicesdb[DeviceId];
            console.log(`${deviceitem}`)
            yield put(ui_sel_tabindex(0));
            //选择第一个tab
            yield put(ui_index_selstatus(0));

            yield put(replace('/index'));
            //选择车辆
            if(!!deviceitem){
              yield put(ui_selcurdevice_request({DeviceId,deviceitem}));
            }
          }
          catch(e){
            console.log(e);
          }
        });


}

export {g_devicesdb};

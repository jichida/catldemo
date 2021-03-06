/*
思路：
构造地理位置树结点,该树固定死(省市区)
树控件渲染该树,若该结点对应数量为0，则不显示结点
树结点的title动态通过render获取
定义数据结构,放入reducer,定时器动态更新之
*/
import jsondataprovinces from './provinces.json';
import jsondatacities from './cities.json';
import jsondataareas from './areas.json';
import map from 'lodash.map';


export function get_initgeotree(){
  //获取第一次完整树结构

  //root
  let gmap_acode_treename = {};
  let gmap_acode_treecount = {};
  let datatree =  {
      id:100000,
      adcode:100000,
      loading: false,
      active : false,
      toggled:true,
      type:'group_root',
      children:[]
  };
  gmap_acode_treename[100000] = '全国';
  gmap_acode_treecount[100000] = 0;

  map(jsondataprovinces,(province)=>{
    let provicecode = parseInt(province.code);
    let provicenode = {
      adcode:provicecode,
      name:province.name,
      loading: false,
      type:'group_provice',
      children:[]
    };
    gmap_acode_treename[provicecode] = province.name;
    gmap_acode_treecount[provicecode] = 0;

    map(jsondatacities,(city)=>{
      let citycode = parseInt(city.code);
      let parent_code = parseInt(city.parent_code);
      if(parent_code === provicecode){
        let citynode = {
          adcode:citycode,
          name:city.name,
          loading: false,
          type:'group_city',
          children:[]
        };
        gmap_acode_treename[citycode] = city.name;
        gmap_acode_treecount[citycode] = 0;

        map(jsondataareas,(area)=>{
          let areacode = parseInt(area.code);
          parent_code = parseInt(area.parent_code);
          if(parent_code === citycode){
            let areanode = {
              adcode:areacode,
              name:area.name,
              loading: false,
              type:'group_area',
              children:[]
            };
            gmap_acode_treename[areacode] = area.name;
            gmap_acode_treecount[areacode] = 0;
            if(gmap_acode_treename[citycode] !== "市辖区"){
              citynode.children.push(areanode);
            }
            else{

              provicenode.children.push(areanode);
            }
          }
        });
        if(gmap_acode_treename[citycode] !== "市辖区"){
          provicenode.children.push(citynode);
        }
      }
    });
    datatree.children.push(provicenode);
  });


  return {datatree,gmap_acode_treename,gmap_acode_treecount};
};

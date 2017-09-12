import { createAction } from 'redux-act';

export const map_setmapinited = createAction('map_setmapinited');
export const mapmain_setmapcenter = createAction('mapmain_setmapcenter');
export const mapmain_setzoomlevel = createAction('mapmain_setzoomlevel');
export const mapmain_setenableddrawmapflag = createAction('mapmain_setenableddrawmapflag');

export const carmapshow_createmap = createAction('carmapshow_createmap');
export const carmapshow_destorymap = createAction('carmapshow_destorymap');

export const ui_selcurdevice_request = createAction('ui_selcurdevice_request');
export const ui_selcurdevice_result = createAction('ui_selcurdevice_result');

export const ui_btnclick_deviceonline  = createAction('ui_btnclick_deviceonline');
export const ui_btnclick_deviceoffline  = createAction('ui_btnclick_deviceoffline');
export const ui_btnclick_alaramall =  createAction('ui_btnclick_alaramall');
export const ui_btnclick_alaramred =  createAction('ui_btnclick_alaramred');
export const ui_btnclick_alaramorange =  createAction('ui_btnclick_alaramorange');
export const ui_btnclick_alaramyellow =  createAction('ui_btnclick_alaramyellow');
export const ui_menuclick_settings = createAction('ui_menuclick_settings');
export const ui_menuclick_logout = createAction('ui_menuclick_logout');
export const ui_btnclick_devicehistorytrackplayback = createAction('ui_btnclick_devicehistorytrackplayback');

export const ui_mycarselcurdevice_request = createAction('ui_mycarselcurdevice_request');
export const ui_mycarselcurdevice_result = createAction('ui_mycarselcurdevice_result');
export const ui_mycar_showtype= createAction('ui_mycarselcurdevice_result');
//轨迹回放
export const mapplayback_start = createAction('mapplayback_start');
export const mapplayback_end = createAction('mapplayback_end');

//获取一个区域
export const mapmain_seldistrict = createAction('mapmain_seldistrict');
export const mapmain_init_device = createAction('mapmain_init_device');
export const mapmain_getdistrictresult = createAction('mapmain_getdistrictresult');
export const mapmain_selgroup = createAction('mapmain_selgroup');

//获取地理位置【城市】
export const mapmain_getgeoresult = createAction('mapmain_getgeoresult');

export const mapmain_clusterMarkerClick = createAction('mapmain_clusterMarkerClick');

export const mapmain_areamountdevices_request= createAction('mapmain_areamountdevices_request');
export const mapmain_areamountdevices_result= createAction('mapmain_areamountdevices_result');

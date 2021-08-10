var neike = [
    {"id": 1, "name": "呼吸内科"},
    {"id": 2, "name": "消化内科"},
    {"id": 3, "name": "神经内科"},
    {"id": 4, "name": "心血管内科"},
    {"id": 5, "name": "肾内科"},
    {"id": 6, "name": "血液内科"},
    {"id": 7, "name": "免疫内科"},
    {"id": 8, "name": "内分泌科"},
    {"id": 9, "name": "感染内科"},
    {"id": 10, "name": "变态反应科"}
]

var waike = [
    {"id": 1, "name": "普通外科"},
    {"id": 2, "name": "神经外科"},
    {"id": 3, "name": "胸外科"},
    {"id": 4, "name": "泌尿外科"},
    {"id": 5, "name": "心血管外科"},
    {"id": 6, "name": "乳腺外科"},
    {"id": 7, "name": "肝胆外科"},
    {"id": 8, "name": "器官移植"},
    {"id": 9, "name": "肛肠外科"},
    {"id": 11, "name": "整形外科"},
    {"id": 12, "name": "颅底外科"},
    {"id": 13, "name": "微创外科"},
    {"id": 14, "name": "器官移植"}
]

var fuke = [
    {"id": 1, "name": "妇科"},
    {"id": 2, "name": "产科"},
    {"id": 3, "name": "妇科内分泌"},
    {"id": 4, "name": "妇产科•计生"},
    {"id": 5, "name": "产前检查科"},
    {"id": 6, "name": "遗传咨询科"},
]

var erke = [
    {"id": 1, "name": "儿科综合"},
    {"id": 2, "name": "小儿内科"},
    {"id": 3, "name": "小儿外科"},
    {"id": 4, "name": "新生儿科"},
    {"id": 5, "name": "儿童营养保健科"}
]

var guke = [
    {"id": 1, "name": "骨科"}
]

var shaoshangke = [
    {"id": 1, "name": "烧伤科"}
]

var erbihouke = [
    {"id": 1, "name": "耳鼻喉科"},
    {"id": 2, "name": "头颈外科"}
]

var yanke = [
    {"id": 1, "name": "眼科"}
]

var kouqiangke = [
    {"id": 1, "name": "口腔科"}
]

var pifuxingbingke = [
    {"id": 1, "name": "皮肤科"},
    {"id": 2, "name": "性病科"}
]

var zhongliuke = [
    {"id": 1, "name": "肿瘤科"}
]

var nanke = [
    {"id": 1, "name": "男科"}
]

var chuanranke = [
    {"id": 1, "name": "传染科"}
]

var jingshenke = [
    {"id": 1, "name": "精神科"},
    {"id": 2, "name": "心理咨询科"}
]

var kangfuyixueke = [
    {"id": 1, "name": "康复医学科"}
]

var jieruyixueke = [
    {"id": 1, "name": "介入医学科"}
]

var jizhenke = [
    {"id": 1, "name": "急诊科"}
]

var jiehebingke = [
    {"id": 1, "name": "结核病科"}
]

var yundongyixueke = [
    {"id": 1, "name": "运动医学科"}
]

var tengtongke = [
    {"id": 1, "name": "疼痛科"}
]

var yingyangke = [
    {"id": 1, "name": "营养科"}
]

var yixueyingxiangxue = [
    {"id": 1, "name": "超声诊断"},
    {"id": 2, "name": "营放射诊断"},
    {"id": 3, "name": "核医学"}
]

var yijikeshi = [
    {"id": 1, "name": "检验科"},
    {"id": 2, "name": "微生物科"},
    {"id": 3, "name": "病理科"},
    {"id": 4, "name": "核医学科"},
    {"id": 5, "name": "理疗科"},
    {"id": 6, "name": "针灸科"},
    {"id": 7, "name": "放疗科"},
    {"id": 8, "name": "激光科"},
    {"id": 9, "name": "体疗科"},
]

// var departs = {
//     1: {"内科": neike},
//     2: {"外科": waike},
//     3: {"妇科": fuke},
//     4: {"儿科": erke},
//     5: {"骨科": guke},
//     6: {"烧伤科": shaoshangke},
//     7: {"耳鼻喉科": erbihouke},
//     8: {"眼科": yanke},
//     9: {"口腔科": kouqiangke},
//     10: {"皮肤性病科": pifuxingbingke},
//     11: {"肿瘤科": zhongliuke},
//     12: {"男科": nanke},
//     13: {"传染科": chuanranke},
//     14: {"精神科": jingshenke},
//     15: {"康复医学科": kangfuyixueke},
//     16: {"介入医学科": jieruyixueke},
//     17: {"急诊科": jizhenke},
//     18: {"结核病科": jiehebingke},
//     19: {"运动医学科": yundongyixueke},
//     20: {"疼痛科": tengtongke},
//     21: {"营养科": yingyangke}
// }

var departs = [
        {"内科": neike}, {"外科": waike}, {"妇科": fuke}, 
        {"儿科": erke}, {"骨科": guke}, {"烧伤科": shaoshangke}, 
        {"耳鼻喉科": erbihouke}, {"眼科": yanke}, {"口腔科": kouqiangke}, 
        {"皮肤性病科": pifuxingbingke}, {"肿瘤科": zhongliuke}, {"男科": nanke}, 
        {"传染科": chuanranke}, {"精神科": jingshenke}, {"康复医学科": kangfuyixueke}, 
        {"介入医学科": jieruyixueke}, {"急诊科": jizhenke}, {"结核病科": jiehebingke}, 
        {"运动医学科": yundongyixueke}, {"疼痛科": tengtongke}, {"营养科": yingyangke}
    ]

module.exports = {
    dataList: departs
}
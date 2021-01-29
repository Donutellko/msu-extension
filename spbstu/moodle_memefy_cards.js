console.log("Started moodle_memefy_cards extension")

const FEATURE_MEMES_NSFW = 'featureUnsafe'
const FEATURE_MEMES = 'featureMemes'

const FEATURE_MEMES_ENABLED = localStorage[FEATURE_MEMES] === 'true'
const FEATURE_MEMES_NSFW_ENABLED = localStorage[FEATURE_MEMES_NSFW] === 'true'

let cards = document.querySelectorAll('.card-img-top')

function memefyCards() {
    if (FEATURE_MEMES_NSFW_ENABLED) {
        memes = memes.concat(unsafeMemes)
    }

    memes.sort((a, b) => Math.random() - 0.5)
    for (let i = 0; i < cards.length; i++) {
        memefyCard(cards[i], memes[i % memes.length])
    }
}

function memefyCard(card, imageUrl) {
    card.style.backgroundSize = 'contain';
    card.style.backgroundPosition = '50%';
    card.style.backgroundRepeat = 'no-repeat';
    card.style.backgroundImage = `url(${imageUrl})`;
    card.style.height = '300pt'
}

function addToggleButton() {
    let text = FEATURE_MEMES_ENABLED ? 'Выключить мемы' : 'Включить мемы'
    let onclick = () => {
        localStorage[FEATURE_MEMES] = !FEATURE_MEMES_ENABLED
        location.reload()
    }
    addSettingButton('memes-toggle', text, onclick)
}

function addNsfwToggleButton() {
    let text = FEATURE_MEMES_NSFW_ENABLED ? 'Выключить NSFW мемы' : 'Включить NSFW мемы'
    let onclick = () => {
        localStorage[FEATURE_MEMES_NSFW] = !FEATURE_MEMES_NSFW_ENABLED
        location.reload()
    }
    addSettingButton('nsfw-toggle', text, onclick)
}

function addSettingButton(id, text, onclick) {
    let button = document.createElement('a')
    button.id = id
    button.text = text
    button.onclick = onclick
    button.href = '#'
    button.className = 'dropdown-item menu-action'

    let container = document.querySelector('#action-menu-1-menu')
    if (container) {
        container.append(button)
    }
}

let memes = [
    'https://img.universitystudent.org/1/4/3489/me-begging-myself-to-study-meme.jpg',
    'https://twopence.social/wp-content/uploads/2015/12/post-to-meme-or-no.png',
    'https://www.mrmemel.com/wp-content/uploads/motivate-study.jpg',
    'https://i.imgflip.com/2knovg.jpg',
    'https://i.imgflip.com/2qnktu.jpg',
    'https://i.imgflip.com/2q453k.jpg',
    'https://i.imgflip.com/2l2d7g.jpg',
    'https://i.imgflip.com/2ctltn.jpg',
    'https://i.imgflip.com/2a2kro.jpg',
    'https://peopletalk.ru/wp-content/uploads/2019/09/img_7579.jpg',
    'https://sun9-70.userapi.com/impf/Ri-OusoulUtCjU__pkrG9LJqu--lLMt720qLLg/bjstZil7TfA.jpg?size=735x736&quality=96&proxy=1&sign=25a18c8de978aa394f793dd738bce434&type=album',
    'https://sun9-72.userapi.com/impf/DtDeJ1VMarOQH0z6syp148gTEny51Dg4JuyN4g/ApexEhrIawY.jpg?size=771x521&quality=96&proxy=1&sign=2c6bd7c4bf52ae88861c5def8e5017bb&type=album',
    'https://sun9-69.userapi.com/impf/s6x0IdWOWf0De4vH1yvdjN3NSW1bbeKyukTLyg/LRGren2BZqE.jpg?size=750x673&quality=96&proxy=1&sign=26f57fe274f464782fb29139d3259198&type=album',
    'https://sun9-32.userapi.com/impf/GKARfHYd85YqpoyJkG1LRDVgWzIwooQRzRVKpQ/GlovHbmJVWQ.jpg?size=733x788&quality=96&proxy=1&sign=d1101653b3c6082617df89fbfee9bbfe&type=album',
    'https://sun9-57.userapi.com/impg/e-LTR4ja8oQiq1eZ9Pjf-xIAxApk4txvawhnBw/y7kqKtBjXWA.jpg?size=719x654&quality=96&proxy=1&sign=0c9d8a790618f04aaa3584e58e9ab817&type=album',
    'https://sun9-71.userapi.com/impg/8xayizcRw8CThzOMEuJgLOW-1WwjOsLDWqAk5Q/oQWa7Y9sZFU.jpg?size=1020x1008&quality=96&proxy=1&sign=bfdad2c5592ddff17069fa0ef73fc31e&type=album',
    'https://sun9-45.userapi.com/impg/OKHOwP3pvrV4oTHF0ERGMOaLi38Q34leaQex_A/swwh7pUvdYY.jpg?size=798x556&quality=96&proxy=1&sign=402345ad9e15bdd94c532ee69fd3b282&type=album',
    'https://sun9-47.userapi.com/impg/YJOWPey8PNC9szDXdZCLdbLwtcP2UYhVM1q7ig/hOZKSKVAzT4.jpg?size=1024x709&quality=96&proxy=1&sign=0ccfee8039e97f8d3a3574a72189e26a&type=album',
    'https://sun9-3.userapi.com/impg/HpIcN9t5f-NDiCrcy6Vz6YMm-PZyIeDppg582w/PP1CvzhEIpw.jpg?size=1078x534&quality=96&proxy=1&sign=29444bff90a1774f0857ac3d314d1487&type=album',
    'https://sun9-38.userapi.com/impg/dMalOcQT_q0fs84qmMd9W2oCE8Hd6qV89_6wqQ/bfrNOPOPKxA.jpg?size=598x607&quality=96&proxy=1&sign=2b8129544986779d13e68de37472f7ee&type=album',
    'https://sun9-46.userapi.com/impg/5GE31a67CvV-WnYyxrq-9Y4DwlhkB-tlDxotKw/rSdc72mA9mg.jpg?size=1280x1600&quality=96&proxy=1&sign=4b4eaa625210fd20be4b6e5d019915ba&type=album',
    'https://sun9-20.userapi.com/impg/Z7Gpgt6ZfhAn1ENhvJdtN8vELy77hN98tfaZYw/u4vjBt6XLrg.jpg?size=439x369&quality=96&proxy=1&sign=92ef148054c8e7347b773305e67eb16a&type=album',
    'https://sun9-41.userapi.com/impg/wA_8yZ-z94Y0-f8ZqXsiC1eE2c7-EhAT1NQmDQ/13N4Ll1D2BU.jpg?size=1200x792&quality=96&proxy=1&sign=55e1b2a6e40c11f049e52850b978a08f&type=album',
    'https://sun9-30.userapi.com/impg/OOfLFd8SmqtbqOn3PeCD860yMeK9EcDejHbo4A/uxd3LHvid7c.jpg?size=1242x1242&quality=96&proxy=1&sign=41683d28e7dd4ae7b69c9e09aa9415e5&type=album',
    'https://sun9-53.userapi.com/impg/iTgZOAPuwS_wqBeCaulabgV5Nw9f-1ljTw5WkQ/bbdwLz3aDX8.jpg?size=882x1080&quality=96&proxy=1&sign=a1a5ae008514cfd6801931c91914b5b5&type=album',
    'https://sun9-29.userapi.com/impg/K15CjVm0hE7iqbvv364N6K9qEn-bO7jXbZCXDg/HF1tChbN70k.jpg?size=1024x768&quality=96&proxy=1&sign=f40e706aecd860c82486792a59276b6b&type=album',
    'https://sun9-34.userapi.com/impg/5D-oyl5Z5Ajzfw4LgFScMuFgtE0B9P0oct6s1w/G7138RmAXWo.jpg?size=577x450&quality=96&proxy=1&sign=33d4fb1ec62a2112eded03db8f249ecb&type=album',
    'https://sun9-56.userapi.com/impg/0SU8Pn65Ifz65qRj4Wydhrg7PmYAsrX3uglXhA/JItLcQJq1eU.jpg?size=666x375&quality=96&proxy=1&sign=0ad4c7cf32f4ae7cd419aaddf9ade1b0&type=album',
    'https://sun9-17.userapi.com/impg/cDk6wlFHMvqRXW7cJ8uOe5FUkLWWYBfLbK7bGg/iiIyFj00ilg.jpg?size=1080x914&quality=96&proxy=1&sign=6de6d089aadc36669c5d405f602a119a&type=album',
    'https://sun9-11.userapi.com/impg/JoP-dGrHKi9leSR61MFrSIp90mG9Pap6ogAS5Q/7Q2XJV1a6V0.jpg?size=742x490&quality=96&proxy=1&sign=5c88d54e89366a3bf435add31f8be42d&type=album',
    'https://sun9-51.userapi.com/impg/l-esPTr7-KjbE8TUhPVDv42F6vYaJo3f5y4JTg/ZVKtteEbnv4.jpg?size=1080x1080&quality=96&proxy=1&sign=2f642d7d4ece0aebb92254a7315d330f&type=album',
    'https://sun9-19.userapi.com/impg/ZVmq1_299TkBH_eKN72DXPJBE6nHcWLlZjAVag/xlvLTJm4BIY.jpg?size=1080x1440&quality=96&proxy=1&sign=6caa7eff5c5e017f4cd5dcae99739f89&type=album',
    'https://sun9-27.userapi.com/impg/I3YdHVFEPxDGara-sM_3x2VH4iwetsLK0GIuFg/pOyHG14pYXk.jpg?size=604x589&quality=96&proxy=1&sign=d424a77b240c7143b8cb0acfd9f80698&type=album',
    'https://sun9-39.userapi.com/impg/b1Rha80DDMYu39Rp7diT4zkSWfkKk6vkfbflWw/A6gUiPDHwlA.jpg?size=864x992&quality=96&proxy=1&sign=4e17d603ca4983156d868a874ea85edf&type=album',
    'https://sun9-13.userapi.com/impg/BNJnsnoElpDJB_QN1CGMyUccBPWunPnstILBFg/12j6uevzMvQ.jpg?size=622x830&quality=96&proxy=1&sign=8e200fdc12f55a081dcc40c6dab74661&type=album',
    'https://sun9-41.userapi.com/impg/BfSim-32w3NE9wPnsGwZjXhscktMnXe8SVzOYQ/GB0Az6yU_J4.jpg?size=1599x1041&quality=96&proxy=1&sign=fbc5460a3e80c479e7f82dd6db89ca53&type=album',
    'https://sun9-44.userapi.com/impg/Kbdgkt4wvPKvCAv4TEO10VXntJSKELZHVoztSw/65PVQTugUU4.jpg?size=828x828&quality=96&proxy=1&sign=23f263c35e83949c22b360efca0aae6f&type=album',
    'https://sun9-47.userapi.com/impg/KtnDR14WgyWwcPOFpPp4G1bx-I7tcm_n1dKGfw/ASzWjpEDTBw.jpg?size=848x1024&quality=96&proxy=1&sign=8ae3db804e089f23c8ed482441e94f7b&type=album',
    'https://sun9-62.userapi.com/impg/q04ybYg9QMQQ5Zk7qbD0S5Wnagh4ebTlPaUESw/UF9lHoz8VLs.jpg?size=960x1358&quality=96&proxy=1&sign=e98848fa660f7c09a69f246566449472&type=album',
    'https://sun9-59.userapi.com/impg/vSJyW52tPGYiBF-c-XTNj15GbALgYfhgFhs3KA/sUDj4Nrl2ns.jpg?size=1125x634&quality=96&proxy=1&sign=10bef4aa62c5148dac710a1a34136401&type=album',
    'https://sun9-57.userapi.com/impg/W4NSegAr2wNC6h_UOjWu-lC98KOjnjUSwvHEoA/j6enVUY_FVo.jpg?size=1600x1600&quality=96&proxy=1&sign=6ef5d15bcf56662ee7d1e1f51fc5e5b5&type=album',
    'https://sun9-63.userapi.com/impg/Wv8lWzISPp85VE_3pN13vorDXd18urDBL78rpA/EB5zAqI5WHM.jpg?size=1200x1600&quality=96&proxy=1&sign=ae3260548273e5baa1ead1adf789a30c&type=album',
    'https://sun9-72.userapi.com/impg/pwwMojnK6IoczjBtDdMJAFoF2zDKZ_RbGb01DQ/po55Qqa7rsI.jpg?size=1920x1080&quality=96&proxy=1&sign=94f71427e28dae8832df36b240aaee01&type=album',
    'https://sun9-57.userapi.com/impg/6nnCu9l1E11-SYII6wCdv8Ahenof6ZPAkK5hoA/K55LA-wQoBQ.jpg?size=1134x1080&quality=96&proxy=1&sign=11f739266245dff387e4cd6973ea1505&type=album',
    'https://sun9-57.userapi.com/impg/6nnCu9l1E11-SYII6wCdv8Ahenof6ZPAkK5hoA/K55LA-wQoBQ.jpg?size=1134x1080&quality=96&proxy=1&sign=11f739266245dff387e4cd6973ea1505&type=album',
    'https://sun9-39.userapi.com/impg/9bkq8lrVsvrZS27Yporgd4RtqKAp3nVub3263g/NbKDb0INP_A.jpg?size=426x437&quality=96&proxy=1&sign=ae8beea1c06658768402e31987ebbb54&type=album',
    'https://sun9-19.userapi.com/impg/hcAHJSxQqNyqvnMJNRIaOZB2Ziryui7gleOegQ/KTBPU2qvxTQ.jpg?size=768x1024&quality=96&proxy=1&sign=576dd1e667ced644a3220b86ed315be8&type=album',
    'https://sun9-20.userapi.com/impg/2pBiEj87l2v4CIRLBDYjthhSXVveaK8QnOU1Yg/DXQ4oyISIJk.jpg?size=400x267&quality=96&proxy=1&sign=1b38c8543c63d1f27b4670fc2ae40635&type=album',
    'https://sun9-22.userapi.com/impg/isuJPgFe_lM-rPKBxXjpNliP5tdSo4FlNaeAbw/OcLYFooetrE.jpg?size=816x666&quality=96&proxy=1&sign=b3aa32b067969912f823115c3617812c&type=album',
    'https://sun9-50.userapi.com/impg/itGNypwJ5V7NNPqBl68fcnq_ptlbSPuZI9TZqw/rqfPTmg8S2c.jpg?size=2151x1380&quality=96&proxy=1&sign=e634d61f3e8058c918550920a3a96490&type=album',
    'https://sun9-16.userapi.com/impg/XIv5XlQryEFRlb8cWdqaK2hlVlZqqA7IUXki_Q/F8-CjkP8o-U.jpg?size=1080x779&quality=96&proxy=1&sign=5d76bcf82539e192484045c4d5b2abb6&type=album',
    'https://sun9-32.userapi.com/impg/z_MDBYBS9KugXkLJ2dSKoFMyXkeX88f9LLLwOQ/7D5MTHSoPkM.jpg?size=1832x1080&quality=96&proxy=1&sign=4b5c0db0d28ca2526b926aede3f94c52&type=album',
    'https://sun9-5.userapi.com/impg/XvX6ovX0-tdzg0_ww4XFGqanJfsTnSYILruouA/xwTmBSAHexA.jpg?size=800x448&quality=96&proxy=1&sign=bd857d015ef5cc1597d64eee3101c34a&type=album',
    'https://sun9-46.userapi.com/impg/LFZdaP63nRavpyoWxBBA2mHN4ZaVbbyGz1fD2Q/Xz09NPf_9n8.jpg?size=639x601&quality=96&proxy=1&sign=4dd71dfec793b776230ef77b7f11d612&type=album',
    'https://sun9-63.userapi.com/impg/k3bwbJQtlEQpF8GQKFP2RMvkhOXWKAhQiQUeVw/oJ--A7EN-RE.jpg?size=411x606&quality=96&proxy=1&sign=502028f00d71a950bcd05aa70a85ec01&type=album',
    'https://sun9-12.userapi.com/impg/S6ggUKfUJ-g39TLbIow0KpCNIVOvnrp_4QQfhA/3zsQdTTvAZQ.jpg?size=1080x579&quality=96&proxy=1&sign=f58eb3340e6b6dc52f5e361857902933&type=album',
    'https://sun9-70.userapi.com/impg/awHsSwavA85ewUw-Qfffc42BhDI4ghRUQ6lC6g/5V5R4uQ6pps.jpg?size=1264x644&quality=96&proxy=1&sign=25c90c25edd32a307dce78b1efe46594&type=album',
    'https://sun9-35.userapi.com/impg/FIXaLXVOQaG8ETbSns6qXr-O7hvQMuYv07eKTQ/rDa1R-n0FKc.jpg?size=811x609&quality=96&proxy=1&sign=f9e002af25c20aea6998918e1bf5a03b&type=album',
    'https://sun9-65.userapi.com/impg/5d5cnPSmXlyK6XnVc-i0eJdhT7DJ01Gtm2E4sQ/PKsweSy9urg.jpg?size=502x458&quality=96&proxy=1&sign=5cec63b378d689f8c3312a73f0ae1214&type=album',
];

let unsafeMemes = [
    'https://sun9-53.userapi.com/impg/iTgZOAPuwS_wqBeCaulabgV5Nw9f-1ljTw5WkQ/bbdwLz3aDX8.jpg?size=882x1080&quality=96&proxy=1&sign=a1a5ae008514cfd6801931c91914b5b5&type=album',
    'https://sun9-41.userapi.com/impg/MtoT9m9LcdD3F_6fjQ2hnLSaxU1zQLWHIwdf8g/c1I8C9KCFGQ.jpg?size=1618x2160&quality=96&proxy=1&sign=093de30d900a12019201612e89fec29e&type=album',
    'https://sun9-27.userapi.com/impg/MkHUB0ytZL5wLNckxt2iQvnaJ_5zEPP1g9wiyA/iJ_7xNLIioM.jpg?size=1024x884&quality=96&proxy=1&sign=9ec4849c1ac99cf5a7c8c14749e78ed5&type=album',
    'https://sun9-50.userapi.com/impg/7oE50dw63xfO7wSoJf8aIM8D9o0PGs0naWQxGQ/ArnNCMPagW4.jpg?size=1080x1314&quality=96&proxy=1&sign=42612a2b3887c3fe5264b4fd1607ea4a&type=album',
    'https://sun9-75.userapi.com/impg/FdK7C-3zVmrUX7d3sDsczXh6gC3k8u78T3vorg/MbIjMoSnBQw.jpg?size=1000x1000&quality=96&proxy=1&sign=3b5ebfeeeadeed983921e00a63e3a079&type=album',
    'https://sun9-65.userapi.com/impg/n09SHvIV5RysAWdDC5tjWjnqZjk5wjkrv95EVA/01popGhPbD4.jpg?size=1440x1920&quality=96&proxy=1&sign=08e2508869a1b817820f4819e809b39e&type=album',
    'https://sun9-44.userapi.com/impg/Xs0h4SvRrzJ8J5A1kTKuvUSjHn4pFEDSAs88kw/gOLmY3j42sQ.jpg?size=619x707&quality=96&proxy=1&sign=504d2d53b96d84ac84e4778d2d7f2234&type=album',
    'https://sun9-50.userapi.com/impg/i289A9hXxzOO_KmGHbdiqZFmCLV3tYri8Hgp7g/VpAGr_TgW-w.jpg?size=679x1000&quality=96&proxy=1&sign=ac1c0417ee3b3852468802634215d1f3&type=album',
    'https://sun9-3.userapi.com/impf/1MVSfM9wc8z1t23a0RxowqxXDJFL7cQb5op9zA/3MFAb5xjvwg.jpg?size=1280x1095&quality=96&proxy=1&sign=6d44c70f1b7a109c26f212284e7c957a&type=album',
    'https://sun9-16.userapi.com/impg/y6p3dbY7Lwu4TaiBqhKtvC5qoHAg3WMuJt4n0g/XTo0f8WFq74.jpg?size=1120x1252&quality=96&proxy=1&sign=0b0cb695aff7826b04f3c125dd9935d3&type=album',
    'https://sun9-35.userapi.com/impg/xO8E9xE2YJs0USUWqFSePYOVvp4JRu32c8wvrA/WY-yR0eYhCQ.jpg?size=600x339&quality=96&proxy=1&sign=a16a1ae6b883c27954105650aa75e9c4&type=album',
    'https://sun9-46.userapi.com/impg/ZqrFU8tz3c1yB9qYfM-sxgydS7x267MUpZg95g/iSffLytfJwM.jpg?size=1920x1031&quality=96&proxy=1&sign=7273a229b0ecfb7352b42d9408521419&type=album',
    'https://sun9-11.userapi.com/impg/zSeIwbSsvXiPyoUHKmiLhC879N-dY9t9H5uZ5A/de6J4g62L4M.jpg?size=1199x1068&quality=96&proxy=1&sign=f1f409afba4eadfef3267c7df55b2712&type=album',
    'https://sun9-37.userapi.com/impg/9w0_qhgeOdAhZVAAqMo0nZTYomTos6O9Y1OC7Q/Tx5wZnL7Zqo.jpg?size=750x582&quality=96&proxy=1&sign=eb86b8a4e085869c85fdb9136ebedc12&type=album',
    'https://sun9-19.userapi.com/impg/vld-1alpANBuS-nckOj-gv562UxlK_sdpe4dbQ/Qalg15Wfpbg.jpg?size=1718x1578&quality=96&proxy=1&sign=20b1f225c1beeb4eff743b667d691f62&type=album',
    'https://sun9-37.userapi.com/impg/tRGoD9c1QTCjkbKUJaOgJV8dn5sO6hoal_GZAQ/iHPwRDNCDv8.jpg?size=1458x1080&quality=96&proxy=1&sign=f952b182082c18d49cbf2e15a9791bf7&type=album',
    'https://sun9-33.userapi.com/impg/sbGHxgyoiMpeV9z0gyircVa75CbNvzVCCTypIA/VcAOt7b9muY.jpg?size=1909x2160&quality=96&proxy=1&sign=437fb9387f0d47f634b90c83a0ad719a&type=album',
    'https://sun9-51.userapi.com/impg/z2b7I5fsdeDO-H2z4b0oGJiAeH0-HUZEhYL1sQ/8wU3uRKy6ek.jpg?size=1080x911&quality=96&proxy=1&sign=d02dbd03aa04be2e8ada2e4759a51187&type=album',
    'https://sun9-22.userapi.com/impg/xGy_4bFjASTBfspX8gytd2zKU1evlVo8aW2t_g/vFz69MuIRXY.jpg?size=828x623&quality=96&proxy=1&sign=6a55b94f00815cd5f7225430e79c4a27&type=album',
    'https://sun9-58.userapi.com/impg/YL7SqxNuAh_dCnfzDwTDMiYH5Co3ZtlKctJDCA/qtEGEBVSYRw.jpg?size=2158x1787&quality=96&proxy=1&sign=ee24350fe370acf04b2965d3e611e681&type=album',
    'https://sun9-41.userapi.com/impg/0VfTZrJP949ZsH_3L3rDdPO7voLKa_1oM9yhTA/QHDGRd0jcbI.jpg?size=1441x1080&quality=96&proxy=1&sign=eb1ea01e02cc1f81a9939fd4539d0b94&type=album',
    'https://sun9-22.userapi.com/impg/0Bz2DFZVtB2DlOvIbEebuuN-avrhww2E-48AbQ/vqAUHQz4wk8.jpg?size=490x811&quality=96&proxy=1&sign=82ef04857c5372dd3e04e81210950db3&type=album',

]

if (cards) {
    addToggleButton()
    if (FEATURE_MEMES_ENABLED) {
        memefyCards()
        addNsfwToggleButton()
    }
}
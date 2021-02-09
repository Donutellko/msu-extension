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
        let card = cards[i]

        let meme = getConstantMeme(card)
            || getKeywordMeme(card)
            || memes[i % memes.length];
        memefyCard(card, meme)
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

function getConstantMeme(card) {
    if (!FEATURE_MEMES_NSFW_ENABLED) return null

    let courseHref = card.parentElement.href
    return constantMemes[courseHref];
}

function getKeywordMeme(card) {
    if (!FEATURE_MEMES_NSFW_ENABLED) return null

    let courseName = card.parentElement.parentElement.textContent
    for (let keyword in keywordMemes) {
        if (courseName.indexOf(keyword) >= 0) {
            return getRandom(keywordMemes[keyword])
        }
    }
    return null;
}

function getRandom(list) {
    return list[Math.floor((Math.random()*list.length))];
}

let keywordMemes = {
    'Сабинин': [
        'https://sun9-55.userapi.com/impg/c857720/v857720338/1a71d6/Z-eOZIwpMqw.jpg?size=646x616&quality=96&proxy=1&sign=b0e36cacf53e89dd4e0453199bb0fa98&type=album',
        'https://sun9-16.userapi.com/impg/c857720/v857720338/1a71e4/8xXuqw2NuRI.jpg?size=361x480&quality=96&proxy=1&sign=ad083fc58ba5472717094f46ad39d240&type=album',
        'https://sun9-52.userapi.com/impf/c855232/v855232767/18f7e2/FwHA001SzgM.jpg?size=934x616&quality=96&proxy=1&sign=c9a5c4fd3431ebe67b5244543d0cf32b&type=album',
        'https://sun9-75.userapi.com/impf/c851532/v851532848/d5145/AZqeUjv6anY.jpg?size=1400x1400&quality=96&proxy=1&sign=401652eecb017a476b5a3e6a807eec10&type=album',
        'https://sun9-49.userapi.com/impf/c844216/v844216663/59889/1mAiVJyA_pM.jpg?size=1024x1200&quality=96&proxy=1&sign=03869cccbf6a06169315413a722783fd&type=album',
        'https://sun9-11.userapi.com/impg/74kKfcR650RGEgZzucmt6xSZaVY9KiAvAm1_FQ/CELPgkEiHto.jpg?size=700x699&quality=96&proxy=1&sign=73fb094d6fd06be3704a5bd1bfeb1938&type=album',
        'https://sun9-56.userapi.com/impg/zCY1bY6rkuXiCJTekwgX3fQREtScQaLCSlm3oQ/4KoULZD2NEY.jpg?size=520x831&quality=96&proxy=1&sign=b34472dc49c6676f279790525185c320&type=album'
    ],
    'Щукин': [
        'https://sun9-28.userapi.com/impg/NxyijuPfulnGYhCedAfJWq1tEWdjqUb5ytJniA/qwd3ov8pfS4.jpg?size=735x1080&quality=96&proxy=1&sign=bea4397f269b75d2b39c7facd9d6926d&type=album',
        'https://sun9-31.userapi.com/impf/c858332/v858332164/6d090/QwKsF00OvUo.jpg?size=1286x1707&quality=96&proxy=1&sign=c8eff6bcbb1fb034a020ce4992d80fa2&type=album',
        'https://sun9-26.userapi.com/impf/c849132/v849132009/13914b/2k-3-SJn6BE.jpg?size=647x960&quality=96&proxy=1&sign=822e5870581eeb0f308cadf9529756d6&type=album',
        'https://sun9-71.userapi.com/impf/c604626/v604626077/3d791/K8JL4tVt9dU.jpg?size=1280x639&quality=96&proxy=1&sign=443f47b8d6edc03bdd4663b6bcd8a75a&type=album',
        'https://sun9-13.userapi.com/impf/c604626/v604626077/3d774/2JAPjb1AQ4E.jpg?size=644x323&quality=96&proxy=1&sign=6503d20933f6a5065d675b219eccb699&type=album',
        'https://sun9-50.userapi.com/impf/c836737/v836737111/1dfb2/pPZFXa6pitQ.jpg?size=262x262&quality=96&proxy=1&sign=4c8d6d1d879d03439a0a3cb372a18e2f&type=album',
        'https://sun9-28.userapi.com/impf/c626518/v626518077/2f653/NdlJjTinD3s.jpg?size=1280x720&quality=96&proxy=1&sign=a3342def239fc083b269b3abb5912df6&type=album',
        'https://sun9-54.userapi.com/impg/a7wjdKqh08OECiOJs6HS6o7-kgzOzoeX8jvk_w/KsiFR3LKThE.jpg?size=716x368&quality=96&proxy=1&sign=ee3c9d032e556d4aec5abc7b3ca843b7&type=album',
        'https://sun9-32.userapi.com/impg/Ea1Wuq2e7UJPVxZbkwSrE5FP7CXk9KPZ0pzaAg/Fhs5FnXBmdU.jpg?size=1024x568&quality=96&proxy=1&sign=941539880a572e9c23098390c13fde3f&type=album',
        'https://sun9-13.userapi.com/impg/aol8QxURm4op_7IbomVYddrb9y4z36yAlcXFqQ/Z1g33phOHfs.jpg?size=303x512&quality=96&proxy=1&sign=c6e7f8ea0c29a73644aefc637daf157e&type=album',
        'https://sun9-24.userapi.com/impg/GjPAQyAwaJf6OpHB9n7mBgFuxf6zarSR4DT9VA/iO5p4wMccpg.jpg?size=922x720&quality=96&proxy=1&sign=d12dd7f03fa9fdfd32839b913bb303b4&type=album'
    ],
    'Сергеев': [
        'https://sun9-19.userapi.com/impf/c621704/v621704034/46881/4d9dCLGGQgI.jpg?size=442x588&quality=96&proxy=1&sign=64c0362b9704aa896106cd2c58060451&type=album'
    ],
    'Веремьев': [
        'https://sun9-62.userapi.com/impg/Kmc2VDbYd0gfkeM3_OiRlIFRnpT4sFP9neSbyA/-3YoJaendtQ.jpg?size=208x410&quality=96&proxy=1&sign=7591c3dcb1d2b3eaf9e65b13b8fd30ab&type=album'
    ],
    'Белых': [
        'https://sun9-61.userapi.com/impg/HDj9M9DofUjNS9fGeAS7dHvQ9PJlwN1TSJE3Hw/bKIOfho1ob0.jpg?size=896x1080&quality=96&proxy=1&sign=5afdfa6b853c3d7664470f33b410254c&type=album'
    ],
    'Пак': [
        'https://sun9-8.userapi.com/impg/CZxIi7brVXWEDyw5VxofwcgT9J75Rj48_nYOsg/3rOZ-HnLLQM.jpg?size=1102x784&quality=96&proxy=1&sign=c1bf1330f93c8ce22d10bbaa1c70ce89&type=album',
        'https://sun9-73.userapi.com/impf/c857524/v857524394/79415/LiS_epixFEs.jpg?size=600x600&quality=96&proxy=1&sign=6e43656e5c5b9ffce1f379cba2921ea7&type=album',
        'https://sun9-68.userapi.com/impf/c824410/v824410829/5a70c/k34jPgXuT_U.jpg?size=1133x779&quality=96&proxy=1&sign=f6609f1fb2cd458dee25ae7b75075445&type=album',
        'https://sun9-65.userapi.com/impf/jumFiSUV7DHdgOaNemCcNojQB3fVbbX2w9idcw/e2zKOdhFzOY.jpg?size=1080x1023&quality=96&proxy=1&sign=6ae0f9f69eb92c7db1cac7c005604abb&type=album',
        'https://sun9-62.userapi.com/impg/M0-YH9YNIuAig6OApSwLKC2UymPrq6v6AHP68A/MqjOac3_TCM.jpg?size=200x310&quality=96&proxy=1&sign=36ee5d4c0fef135f6dceb9106581c30b&type=album',
        'https://sun9-67.userapi.com/impg/JuEwsPKNjvUC7St9S0pygok6NK-uZ2F_wIq2DA/tdBwY8xqL_0.jpg?size=490x638&quality=96&proxy=1&sign=14cf8f9ee2c7c2918f581575772c6483&type=album'
    ],
    'Брык': [
        'https://sun9-63.userapi.com/impf/c846420/v846420404/1bfe03/mpGBins4U4s.jpg?size=806x1280&quality=96&proxy=1&sign=f6ab64dc9e58913b88b61fb039e0667a&type=album',
        'https://sun9-57.userapi.com/impf/c849128/v849128208/ec02f/HfrRRnWFgUQ.jpg?size=679x559&quality=96&proxy=1&sign=582b044d81bb847554f71968be57924e&type=album',
    ],
    'Коваленко': [
        'https://sun9-33.userapi.com/impf/KOkxfpcJpoxKqMDfwAZgr8-abxGU5FX3rbVnQA/hjvZOjEIBLk.jpg?size=1080x1079&quality=96&proxy=1&sign=3ed802fa9d1f94078a0a3f4e6c07ab79&type=album',
        'https://sun9-72.userapi.com/impf/6X1SiSpj26NsNulxEzemApdErIC8WncDI-DPTg/zqMN6rtKq-s.jpg?size=545x514&quality=96&proxy=1&sign=f0c917a6f47ab02d0927fc748fdce7ca&type=album',
        'https://sun9-33.userapi.com/impf/Gk39gqh2-Di-hTXGbG71QkKaV4xxxNjN_npx0w/_PsOxdXfi4U.jpg?size=1292x800&quality=96&proxy=1&sign=36241fc372ace4f40377919789091a87&type=album',
        'https://sun9-18.userapi.com/impf/4jRgBuD0zFFEe6GNo7NSXUeJw2K3L-6bn9P8Nw/nQdruMW3RK4.jpg?size=545x547&quality=96&proxy=1&sign=685f23e72cfb71c7c2e70720f7a36b10&type=album',
        'https://sun9-32.userapi.com/impf/omzQLDOmc_AzslpVV9ECwmYYDZY-0rqKX39zoA/ufaF78CFmWU.jpg?size=392x228&quality=96&proxy=1&sign=6a844fa1835aba8c43d4e035c43a6f8c&type=album',

    ],
    'Щербаков': [
        'https://sun9-62.userapi.com/impf/n9s-NREbvlTY69hkXo9douIvRFSdMg9hpmCibQ/3mZGpMHhGxo.jpg?size=700x948&quality=96&proxy=1&sign=d39d1035520ded8c2ce4343d15f9793d&type=album'
    ],
    'Тушканова': [
        'https://sun9-32.userapi.com/impf/ytbitDVT7SdJPKU0XVfLZVpCZ9572WPJEIAZXQ/kFwIUZHEocE.jpg?size=512x473&quality=96&proxy=1&sign=aa923b244fb64d69aaba052aa21d6ecf&type=album',
        'https://sun9-71.userapi.com/impf/nbbxALMFUGCc4H8OGQeM8Ilutq8vwVtAYa8yUA/uE_OI6EL1JQ.jpg?size=540x357&quality=96&proxy=1&sign=e785792b6b42911b8aeddec045b71309&type=album',
        'https://sun9-1.userapi.com/impf/ZiJeUAF7Uwhm2WMh5HnkcqFTn5RsOwCkNaEJpQ/Gy6Jyg4cbiU.jpg?size=1084x484&quality=96&proxy=1&sign=b88ddc4555005746f448f22cb0640845&type=album',
        'https://sun9-4.userapi.com/impf/8cDLI13bY_aiTaxQnMQDIIx7bZS3r-o4x4Ev5w/aIzecmyvmfM.jpg?size=498x343&quality=96&proxy=1&sign=31b4b38286ace41beddc5c4a777961e8&type=album'
    ]
}

let constantMemes = {
    'https://dl.spbstu.ru/course/view.php?id=307': 'https://sun9-61.userapi.com/impf/c848732/v848732376/d82/RDfMykrfLgQ.jpg?size=289x241&quality=96&proxy=1&sign=7165870e0a4bfee4bbbbfb5deec2a43a&type=album',
    'https://dl.spbstu.ru/course/view.php?id=290': getRandom(keywordMemes['Щукин']), // Методика преподавания компьютерных наук Щукин
    'https://dl.spbstu.ru/course/view.php?id=478': getRandom(keywordMemes['Щукин']), // Дипломное проектирование Щукин
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
    'https://sun9-68.userapi.com/impg/Pk2JduxmKQdKW7FDGqWuaDt3EMbFfk2B2HKpDQ/yiq3eXWnKBQ.jpg?size=1234x464&quality=96&proxy=1&sign=be3eec821e5a3b0999bbf1d5744e0919&type=album',
    'https://sun9-9.userapi.com/impg/CCH-8O_Tbiv1U-Pr7yFL22qCGSBxFj4kFGDT7w/Azn5jr5FYTM.jpg?size=720x725&quality=96&proxy=1&sign=6ce7d1fb0afb4e58be9c2c0908a0f28a&type=album',
    'https://sun9-37.userapi.com/impg/o5PDZ_lN86Txec6UZRyaHRQ7A0YqdfuI4DOyuw/zE2pjIYjKRE.jpg?size=1242x1032&quality=96&proxy=1&sign=17df87c3a3f99a893239410446660be5&type=album',
    'https://sun9-41.userapi.com/impg/CXCHBxyjUAmrKG72ZHagskZCQpepk1aRExuNEA/NmmVaZk5sjE.jpg?size=1080x1080&quality=96&proxy=1&sign=e624bd45e01fd7cc5cfa5dc38492caf9&type=album',
    'https://sun9-44.userapi.com/impg/twgld59ts05r4TCB3AnTim5Xo3ZxtL5UDcn87Q/HRIcyFP2iW4.jpg?size=604x457&quality=96&proxy=1&sign=10e4e24d509cbd6d23668c700da119dd&type=album',
    'https://sun9-48.userapi.com/impg/4ZMJ5LyRY0cYBXMwA94aVWSozodtMzLM6_Q2fw/-3ZioYDjf_U.jpg?size=1200x1600&quality=96&proxy=1&sign=65441f725a2f17fd252b4af05697109b&type=album',
    'https://sun9-74.userapi.com/impg/AS1vlrw_QIYSF6198aCUH0o-BzAbrJJFSLrQMw/xJQqwGoiXYg.jpg?size=1080x878&quality=96&proxy=1&sign=6bbd9cd27d6b0d8711ab26f7aae999ce&type=album',
    'https://sun9-11.userapi.com/impg/srgkA75S0jvuqcMb2j8OTKhd02A3LOYdET8QSg/-PycG98aUdw.jpg?size=1080x596&quality=96&proxy=1&sign=3b5d251c1d83f00b40d05161f71c1c58&type=album',
    'https://sun9-20.userapi.com/impg/i68LD5esFoR0szPB0_4ju7BXAfI2j3K1ceJ64g/3cSLOAMCElM.jpg?size=1832x1080&quality=96&proxy=1&sign=84d3b62fb8f451821d25323aa220252e&type=album',
    'https://sun9-68.userapi.com/impg/9SbSCsaz7SKgK5_EbQzBO7nKPjz33XuBRdAG_Q/8a7ipiZbYE4.jpg?size=640x631&quality=96&proxy=1&sign=bc57d51d92ddb0219e637033ac71e985&type=album',
    'https://sun9-59.userapi.com/impg/WbbOPgQEnt7MGWtZv8XWwVtwEo34pyMEgiFMmA/SQcHyzsSypI.jpg?size=642x1352&quality=96&proxy=1&sign=9d1d8945beb4f0957c42d8b64b89060e&type=album',
    'https://sun9-6.userapi.com/impg/xBMgW82wIJ7mdX-DrhFZdorE_lQ8a-SHAsioyw/GTofo-3YCnQ.jpg?size=1080x1128&quality=96&proxy=1&sign=e206ddd2e8e155a39f5713d30547beab&type=album',
    'https://sun9-14.userapi.com/impg/Ec5Dw31auuyUmdm8aq57hYrOXLk7aVSHJ-rcmg/ascnCRWVXWU.jpg?size=549x450&quality=96&proxy=1&sign=9de8da6ec40c8e5846c6eadeb6704378&type=album',
    'https://sun9-73.userapi.com/impg/w2ZezK7wqBq26ReKV1y81MCtfCvdlZ3w54liWw/7BHeP8hZX_k.jpg?size=933x1080&quality=96&proxy=1&sign=6016c662c6caa2aee1d6607ef1260c77&type=album',
    'https://sun9-31.userapi.com/impg/FGrv4p47ff-6gn7oY_fmcrz0OMTiUFH30lDHjQ/rP7yIpRxamE.jpg?size=604x600&quality=96&proxy=1&sign=e6bb3f67356212b7218b5ab63e99bf22&type=album',
    'https://sun9-64.userapi.com/impg/mwIax3EyDLuTSdE9YqLvulo_GU7X9rvRRZG0og/2GowFRgwezM.jpg?size=800x599&quality=96&proxy=1&sign=b4086c428e0090cae48be0f8f1830356&type=album',
    'https://sun9-28.userapi.com/impg/txs28kx-iJko6j59x3_vqqU3LDxkJMCflc5k7w/tkI7CyC12Hc.jpg?size=1730x1480&quality=96&proxy=1&sign=61beedc264615cc3f6ae12d0c92b3767&type=album',
    'https://sun9-5.userapi.com/impg/jxJolCAc4q3X3CeXQP62VQZn-IzlBekAj6O6kA/oFoPTPZlJc0.jpg?size=1080x604&quality=96&proxy=1&sign=b29a32b2487fc85218bffe561e995837&type=album',
    'https://sun9-27.userapi.com/impg/c857724/v857724619/2359e4/sVPX2pX1hYE.jpg?size=1080x727&quality=96&proxy=1&sign=81b1aabbff91d7abb1710439693c43b6&type=album',
    'https://sun9-63.userapi.com/impg/YSOYDrB7zQ27HZTy55XXlOBI176QM5S6ihmDpw/g5iwvCu3wAg.jpg?size=614x210&quality=96&proxy=1&sign=3bae128a536b0bed5d3f289ef3a1df88&type=album',

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
    'https://sun9-23.userapi.com/impg/cUBX6k1cBxTZWXkPNEYAaGq9_o_sj4AH0SQnKA/HhfaXbqH_7M.jpg?size=1067x539&quality=96&proxy=1&sign=f95755edd693f5fa6f6a5cd6eb9c48c8&type=album',
    'https://sun9-6.userapi.com/impg/3g6StYo7o4Ct7ySIHNxHYqOU0J395kCSXIti8A/no6uy4kppGI.jpg?size=751x785&quality=96&proxy=1&sign=aae44972787c3c0e2a2254c6bb49eba1&type=album',
    'https://sun9-3.userapi.com/impg/ZtazGegHDwyKfqlSUklTciCuwNbsFIeaO8HHOQ/LRsjHg4qUBM.jpg?size=849x1635&quality=96&proxy=1&sign=3025e73613417fcfee3c0c6e871dd18e&type=album',

]

if (cards) {
    addToggleButton()
    if (FEATURE_MEMES_ENABLED) {
        memefyCards()
        addNsfwToggleButton()
    }
}
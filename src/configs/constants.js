const linkTG = "https://t.me/Copyly_bot?start=";
const walletNum = "0xBaAdB527c4b1B5C360b4aC905F31AEf01b5B3CE6";
const password = "5EGsdBpnU4Te";
const messageText = "Sign the following message to authorize: ";

const testData = {
  balances: [
    {
      date: "1698292800",
      value: -0.2599871679396266,
    },
    {
      date: "1698379200",
      value: -0.017597789225956006,
    },
    {
      date: "1698465600",
      value: -0.21278619042578317,
    },
    {
      date: "1698552000",
      value: -0.6467246549156155,
    },
    {
      date: "1698638400",
      value: -0.43760648151517956,
    },
    {
      date: "1698724800",
      value: -0.06812841179814833,
    },
    {
      date: "1698811200",
      value: -1.262629953643255,
    },
    {
      date: "1698897600",
      value: -2.020136031383857,
    },
    {
      date: "1698984000",
      value: -0.9789092991014826,
    },
    {
      date: "1699070400",
      value: -1.3031339780001543,
    },
    {
      date: "1699156800",
      value: -1.1520178542062938,
    },
    {
      date: "1699333200",
      value: -0.7843719436532979,
    },
    {
      date: "1699419600",
      value: -1.5723249743615106,
    },
    {
      date: "1699506000",
      value: -0.7986950146119224,
    },
    {
      date: "1699592400",
      value: -0.1389440598191436,
    },
    {
      date: "1699678800",
      value: -0.025567202436713288,
    },
    {
      date: "1699765200",
      value: 0.0321964927995918,
    },
    {
      date: "1699851600",
      value: 0.10044164908720798,
    },
    {
      date: "1699938000",
      value: 0.42146196353197085,
    },
    {
      date: "1700024400",
      value: 0.5889318086510019,
    },
    {
      date: "1700110800",
      value: 0.748654773577891,
    },
    {
      date: "1700197200",
      value: 0.043705127579480196,
    },
    {
      date: "1700370000",
      value: 1.373401977022076,
    },
    {
      date: "1700456400",
      value: 1.4432984331000973,
    },
    {
      date: "1700542800",
      value: 1.192275903841277,
    },
    {
      date: "1700888400",
      value: 1.3912237842672206,
    },
  ],
  daily_pnl: [
    {
      date: "1698379200",
      value: 0.2423893787136706,
    },
    {
      date: "1698465600",
      value: -0.19518840119982717,
    },
    {
      date: "1698552000",
      value: -0.4339384644898323,
    },
    {
      date: "1698638400",
      value: 0.20911817340043592,
    },
    {
      date: "1698724800",
      value: 0.36947806971703123,
    },
    {
      date: "1698811200",
      value: -1.1945015418451068,
    },
    {
      date: "1698897600",
      value: -0.7575060777406017,
    },
    {
      date: "1698984000",
      value: 1.0412267322823743,
    },
    {
      date: "1699070400",
      value: -0.3242246788986717,
    },
    {
      date: "1699156800",
      value: 0.15111612379386052,
    },
    {
      date: "1699333200",
      value: 0.3676459105529959,
    },
    {
      date: "1699419600",
      value: -0.7879530307082128,
    },
    {
      date: "1699506000",
      value: 0.7736299597495883,
    },
    {
      date: "1699592400",
      value: 0.6597509547927788,
    },
    {
      date: "1699678800",
      value: 0.11337685738243031,
    },
    {
      date: "1699765200",
      value: 0.05776369523630509,
    },
    {
      date: "1699851600",
      value: 0.06824515628761618,
    },
    {
      date: "1699938000",
      value: 0.32102031444476287,
    },
    {
      date: "1700024400",
      value: 0.16746984511903107,
    },
    {
      date: "1700110800",
      value: 0.1597229649268891,
    },
    {
      date: "1700197200",
      value: -0.7049496459984108,
    },
    {
      date: "1700370000",
      value: 1.3296968494425958,
    },
    {
      date: "1700456400",
      value: 0.06989645607802131,
    },
    {
      date: "1700542800",
      value: -0.2510225292588204,
    },
    {
      date: "1700888400",
      value: 0.1989478804259437,
    },
  ],
  cumulative_pnl: [
    {
      date: "1698379200",
      value: 0.2423893787136706,
    },
    {
      date: "1698465600",
      value: 0.047200977513843445,
    },
    {
      date: "1698552000",
      value: -0.38673748697598886,
    },
    {
      date: "1698638400",
      value: -0.17761931357555294,
    },
    {
      date: "1698724800",
      value: 0.1918587561414783,
    },
    {
      date: "1698811200",
      value: -1.0026427857036286,
    },
    {
      date: "1698897600",
      value: -1.7601488634442304,
    },
    {
      date: "1698984000",
      value: -0.7189221311618561,
    },
    {
      date: "1699070400",
      value: -1.0431468100605277,
    },
    {
      date: "1699156800",
      value: -0.8920306862666671,
    },
    {
      date: "1699333200",
      value: -0.5243847757136713,
    },
    {
      date: "1699419600",
      value: -1.312337806421884,
    },
    {
      date: "1699506000",
      value: -0.5387078466722958,
    },
    {
      date: "1699592400",
      value: 0.12104310812048302,
    },
    {
      date: "1699678800",
      value: 0.23441996550291333,
    },
    {
      date: "1699765200",
      value: 0.2921836607392184,
    },
    {
      date: "1699851600",
      value: 0.3604288170268346,
    },
    {
      date: "1699938000",
      value: 0.6814491314715975,
    },
    {
      date: "1700024400",
      value: 0.8489189765906285,
    },
    {
      date: "1700110800",
      value: 1.0086419415175176,
    },
    {
      date: "1700197200",
      value: 0.3036922955191068,
    },
    {
      date: "1700370000",
      value: 1.6333891449617026,
    },
    {
      date: "1700456400",
      value: 1.703285601039724,
    },
    {
      date: "1700542800",
      value: 1.4522630717809035,
    },
    {
      date: "1700888400",
      value: 1.6512109522068472,
    },
  ],
};

const testData2 = {
  balances: [
    {
      date: "1698811200",
      value: -0.429,
    },
    {
      date: "1699246800",
      value: -0.482,
    },
    {
      date: "1699678800",
      value: -0.932,
    },
    {
      date: "1700110800",
      value: 0.449,
    },
    {
      date: "1700197200",
      value: 0.155,
    },
    {
      date: "1700629200",
      value: -0.027,
    },
  ],
  daily_pnl: [
    {
      date: "1699246800",
      value: -0.053,
    },
    {
      date: "1699678800",
      value: -0.45,
    },
    {
      date: "1700110800",
      value: 1.381,
    },
    {
      date: "1700197200",
      value: -0.294,
    },
    {
      date: "1700629200",
      value: -0.182,
    },
  ],
  cumulative_pnl: [
    {
      date: "1699246800",
      value: -0.053,
    },
    {
      date: "1699678800",
      value: -0.503,
    },
    {
      date: "1700110800",
      value: 0.878,
    },
    {
      date: "1700197200",
      value: 0.584,
    },
    {
      date: "1700629200",
      value: 0.402,
    },
  ],
};

const table = [
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96011",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96012",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96013",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96014",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96015",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96016",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96017",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96018",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96019",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96020",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96021",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96022",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96023",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96024",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96025",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96026",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA960272",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96028",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96029",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
  {
    wallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96030",
    pl: "72.49",
    dep: "+0.7%",
    proc: "66",
    tokens: "160",
    last: "01.12.2023 14:09",
  },
];

const testWallet = {
  num: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  tokens: [
    {
      address: "0xcb454adae2595ac182fc1807b0c59ef3f31496be",
      bought: 0.2010883324647998,
      amount: 0.0,
      sold: 0.1688483542807498,
      first_block: 18505992,
      timestamp: 1699189547,
      info: {
        token_name: "GROK IS FINE",
        token_symbol: "GIF",
        token_decimals: "9",
      },
      rugpulled: 0,
      pnl: -0.03223997818405,
      roi: -16.032744311355586,
    },
    {
      address: "0x0c21638d4bcb88568f88bc84a50e317715f8de8a",
      bought: 0.10790029237836368,
      amount: 0.0,
      sold: 0.04967981463544657,
      first_block: 18507839,
      timestamp: 1699211951,
      info: {
        token_name: "GrokDogeX",
        token_symbol: "GDX",
        token_decimals: "18",
      },
      rugpulled: 0,
      pnl: -0.05822047774291711,
      roi: -53.95766448784115,
    },
    {
      address: "0x6d5777dce2541175adf6d49cadd666f3ab0ac142",
      bought: 0.38223168532987506,
      amount: 0,
      sold: 0.20763602760035205,
      first_block: 18508360,
      timestamp: 1699218299,
      info: {
        token_name: "CARTMAN",
        token_symbol: "CARTMAN",
        token_decimals: "18",
      },
      really_left: 0.0,
      rugpulled: 0,
      pnl: -0.174595657729523,
      roi: -45.677965597970456,
    },
    {
      address: "0x8c9cfafdd13d718dc97011293d159bb4f2494237",
      bought: 0.21233561637473397,
      amount: 0,
      sold: 0.25672310946081733,
      first_block: 18509881,
      timestamp: 1699236647,
      info: {
        token_name: "GPT-4 AI",
        token_symbol: "GPT4",
        token_decimals: "9",
      },
      really_left: 0.0,
      rugpulled: 0,
      pnl: 0.04438749308608336,
      roi: 20.90440305961081,
    },
    {
      address: "0xd45c3ac233d66f12b600f439585a5ae1cd0b9408",
      bought: 0.12305960923151826,
      amount: 0.0,
      sold: 0.12920053712016488,
      first_block: 18511463,
      timestamp: 1699255787,
      info: {
        token_name: "Grok Inu",
        token_symbol: "GROKI",
        token_decimals: "9",
      },
      rugpulled: 0,
      pnl: 0.006140927888646619,
      roi: 4.990205906710934,
    },
    {
      address: "0xbe6be64e9e5042b6e84e4c27956cce6353efa5f5",
      bought: 0.2067824967547573,
      amount: 0,
      sold: 0.15134860013293117,
      first_block: 18511595,
      timestamp: 1699257395,
      info: { token_name: "Beg", token_symbol: "BEG", token_decimals: "18" },
      really_left: 0.0,
      rugpulled: 0,
      pnl: -0.05543389662182613,
      roi: -26.807828269706196,
    },
    {
      address: "0x3ad9d01c8a0bb9130a3e021304b81e1294dc53a8",
      bought: 0.1518672392161764,
      amount: 0.0,
      sold: 0.04844060226609742,
      first_block: 18513106,
      timestamp: 1699275707,
      info: {
        token_name: "CHAT GPT VS GROK",
        token_symbol: "CHOK",
        token_decimals: "9",
      },
      rugpulled: 0,
      pnl: -0.10342663695007898,
      roi: -68.10332332627425,
    },
    {
      address: "0x34ff2b0ff7be56936e66974e996067b4b706c028",
      bought: 0.2101046818275185,
      amount: 0,
      sold: 0.18799104779716005,
      first_block: 18517239,
      timestamp: 1699325771,
      info: {
        token_name: "Snoopy",
        token_symbol: "SNOOPY",
        token_decimals: "9",
      },
      really_left: 0.0,
      rugpulled: 0,
      pnl: -0.02211363403035846,
      roi: -10.525055338134841,
    },
    {
      address: "0xf3850b34adb941271b93f8e841cd373b342ab0b7",
      bought: 0.13006306490904856,
      amount: 0,
      sold: 0.17793924919241583,
      first_block: 18519373,
      timestamp: 1699351631,
      info: {
        token_name: "Vampire Survivors",
        token_symbol: "VAMPS",
        token_decimals: "18",
      },
      really_left: 0.0,
      rugpulled: 0,
      pnl: 0.04787618428336726,
      roi: 36.80997700373005,
    },
    {
      address: "0x4e668aed22f5d84a80229bb4c00e4e00e2c94837",
      bought: 0.054143312302054825,
      amount: 3047266.971057069,
      first_block: 18524505,
      timestamp: 1699413455,
      info: {
        token_name: "Wilson, Lo Siento",
        token_symbol: "WILSON",
        token_decimals: "18",
      },
      really_left: 3047266.971057069,
      rugpulled: 1,
      pnl: -0.054143312302054825,
      roi: -100.0,
    },
    {
      address: "0x608e2531bcaf81451958f0f4f6fb8307ab3d1b95",
      bought: 0.05939043554586909,
      amount: 0,
      sold: 0.15716353911135145,
      first_block: 18542021,
      timestamp: 1699625051,
      info: {
        token_name: "ANGRYCAT",
        token_symbol: "ACAT",
        token_decimals: "18",
      },
      really_left: 0.0,
      rugpulled: 0,
      pnl: 0.09777310356548236,
      roi: 164.62769243369016,
    },
    {
      address: "0xc9524dad5e04a86a338800dcb0519bb6a09df5ba",
      bought: 0.11327934097684789,
      amount: 0.0,
      sold: 0.05158981108283045,
      first_block: 18543464,
      timestamp: 1699642499,
      info: {
        token_name: "Fuck Coin",
        token_symbol: "FUCK",
        token_decimals: "18",
      },
      rugpulled: 0,
      pnl: -0.061689529894017436,
      roi: -54.45788204808287,
    },
  ],
  last_activity: 1701609863,
  timestamp2balance: {
    1699189535: 0.31045873563015014,
    1699189547: 0.10937040316535034,
    1699191035: 0.10789344911529532,
    1699191047: 0.15193408026606312,
    1699192559: 0.15193408026606312,
    1699192571: 0.2767418033960451,
    1699211939: 0.4267418033960451,
    1699211951: 0.31884151101768143,
    1699212839: 0.3168754766841011,
    1699212851: 0.36655529131954767,
    1699218287: 0.7478241313195476,
    1699218299: 0.36559244598967255,
    1699218455: 0.3643030389845844,
    1699218467: 0.5719390665849364,
    1699236635: 0.5719390665849364,
    1699236647: 0.35960345021020246,
    1699241735: 0.3584528523604903,
    1699241747: 0.4424378558146717,
    1699242479: 0.4424378558146717,
    1699242491: 0.5467817875356087,
    1699243583: 0.5467817875356087,
    1699243595: 0.6151759618213076,
    1699255775: 0.6151759618213076,
    1699255787: 0.49211635258978936,
    1699256135: 0.49065803712623535,
    1699256147: 0.5723318284158981,
    1699256411: 0.5723318284158981,
    1699256423: 0.6198585742464002,
    1699257383: 0.6198585742464002,
    1699257395: 0.41307607749164293,
    1699275695: 0.41167648404395163,
    1699275707: 0.25980924482777523,
    1699277099: 0.2580431113488657,
    1699277111: 0.3064837136149631,
    1699325759: 0.3064837136149631,
    1699325771: 0.0963790317874446,
    1699326563: 0.09506861176953493,
    1699326575: 0.2464172119024661,
    1699328279: 0.2464172119024661,
    1699328291: 0.3409739905452543,
    1699329947: 0.3409739905452543,
    1699329959: 0.43440825969962615,
    1699351619: 0.43440825969962615,
    1699351631: 0.3043451947905776,
    1699362335: 0.3029497827682077,
    1699362347: 0.41645907212952993,
    1699365983: 0.41645907212952993,
    1699365995: 0.48088903196062355,
    1699413443: 0.48088903196062355,
    1699413455: 0.4267457196585687,
    1699625039: 0.4255993004462276,
    1699625051: 0.36620886490035853,
    1699625363: 0.36403989706391165,
    1699625375: 0.44847156925595405,
    1699637651: 0.44847156925595405,
    1699637663: 0.5212034361752631,
    1699642487: 0.5212034361752631,
    1699642499: 0.4079240951984152,
    1699642883: 0.40519714282982106,
    1699642895: 0.4567869539126515,
    1701609851: 0.0,
    1701609863: 0.0,
  },
  profit_factor: 0.3491556940368456,
  overall_tokens: 12,
  win_rate_amount: 4,
  win_rate_perc: 0.3333333333333333,
  rugged_perc: 0.08333333333333333,
  roi: -18.731522284084935,
  pnl: -0.3656854146312463,
  profits: 0.1961777088235796,
  losses: 0.5618631234548259,
  pnl_by_timestamp: {
    1699120800: -0.03223997818405,
    1699207200: -0.34114824806961525,
    1699293600: 0.025762550253008804,
    1699380000: -0.054143312302054825,
    1699466400: 0,
    1699552800: 0.09777310356548236,
    1699639200: -0.061689529894017436,
  },
  cur_balance: 0.0,
};

const table2 = [testWallet, testWallet, testWallet, testWallet, testWallet, testWallet, testWallet, testWallet, testWallet, testWallet];

module.exports = { testData, testData2, linkTG, walletNum, table, testWallet, table2, password, messageText };

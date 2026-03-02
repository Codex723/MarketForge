"use client";

import { useState } from "react";

const NIGERIA_DATA = {
  // LAGOS STATE
  Lagos: {
    areas: ["Ikeja", "Lekki", "Victoria Island", "Surulere", "Yaba", "Ajah", "Ikorodu", "Apapa", "Oshodi", "Alimosho", "Badagry", "Epe", "Lagos Island", "Mushin", "Shomolu", "Kosofe", "Ifako-Ijaiye", "Agege", "Amuwo-Odofin", "Ojo"],
    junctions: {
      Ikeja: ["Computer Village Junction", "Allen Avenue Junction", "Alausa Junction", "Ikeja Along Bus Stop", "Ojota Junction", "Maryland Junction"],
      Lekki: ["Lekki Phase 1 Gate", "Admiralty Way Junction", "Chevron Junction", "Jakande Junction", "Lekki-Epe Expressway", "Marwa Junction"],
      "Victoria Island": ["Ozumba Mbadiwe Junction", "Ahmadu Bello Way", "Adeola Odeku Junction", "Bar Beach Junction", "Ligali Ayorinde Junction"],
      Surulere: ["Ojuelegba Junction", "National Stadium Junction", "Aguda Junction", "Adeniran Ogunsanya Junction", "Itire Junction"],
      Yaba: ["Yaba Bus Stop", "Herbert Macaulay Way", "Sabo Junction", "Jibowu Junction", "Palm Grove Junction"],
      Ajah: ["Ajah Market Junction", "Abraham Adesanya Junction", "Sangotedo Junction", "Thomas Estate Junction", "Eleko Junction"],
      Ikorodu: ["Ikorodu Garage", "Owutu Junction", "Lagos Road Junction", "Benson Bus Stop", "Imota Junction"],
      Apapa: ["Tin Can Island Junction", "Wharf Road Junction", "Creek Road Junction", "Marine Beach Junction"],
      Oshodi: ["Oshodi Under Bridge", "Airport Road Junction", "Mushin Junction", "International Airport Bus Stop"],
      Alimosho: ["Egbeda Junction", "Iyana Ipaja Junction", "Idimu Junction", "Ayobo Junction", "Igando Junction"],
      Badagry: ["Badagry Garage", "Agbara Junction", "Seme Border Junction", "Badagry Market"],
      Epe: ["Epe Junction", "Epe Market", "Mojoda Junction", "Epe Garage"],
      "Lagos Island": ["CMS Junction", "Broad Street", "Balogun Market", "Idumota Junction", "Carter Bridge"],
      Mushin: ["Mushin Junction", "Idi-Oro Junction", "Ojuwoye Market", "Papa Ajao Junction"],
      Shomolu: ["Shomolu Junction", "Bariga Junction", "Pedro Junction", "Ifako Junction"],
      Kosofe: ["Ojota Junction", "Mile 12 Junction", "Ketu Junction", "Berger Junction"],
      "Ifako-Ijaiye": ["Ogba Junction", "Agege Motor Road", "Ifako Junction", "Command Junction"],
      Agege: ["Agege Motor Road", "Pen Cinema Junction", "Agege Market", "Dopemu Junction"],
      "Amuwo-Odofin": ["Mile 2 Junction", "Festac Town", "Amuwo Junction", "Satellite Town"],
      Ojo: ["Ojo Barracks Junction", "Trade Fair Junction", "Alaba Market", "Ijanikin Junction"],
    },
  },
  // ABUJA FCT
  Abuja: {
    areas: ["Wuse", "Garki", "Maitama", "Asokoro", "Gwarinpa", "Kubwa", "Lokogoma", "Lugbe", "Kuje", "Nyanya", "Bwari", "Gwagwalada", "Karu", "Jabi", "Central Area"],
    junctions: {
      Wuse: ["Wuse Market Junction", "Zone 1 Roundabout", "Zone 4 Junction", "Banex Junction", "Wuse 2 Junction"],
      Garki: ["Garki Market Junction", "Area 1 Roundabout", "Area 3 Junction", "Shehu Shagari Way", "Area 8 Junction"],
      Maitama: ["Maitama Roundabout", "Aso Drive Junction", "Mississippi Junction", "Aguiyi Ironsi Street"],
      Asokoro: ["Asokoro Roundabout", "Shehu Yar'adua Way", "Lobito Crescent Junction", "Diplomatic Zone"],
      Gwarinpa: ["Gwarinpa Estate Junction", "1st Avenue Gate", "NNPC Junction", "Efab Estate Junction"],
      Kubwa: ["Kubwa Express Junction", "Phase 4 Gate", "Byazhin Junction", "Kubwa Market", "Dutse Junction"],
      Lokogoma: ["Lokogoma Gate", "Before Dunamis Junction", "Lokogoma Phase 1", "Shoprite Junction"],
      Lugbe: ["Lugbe Market Junction", "Airport Road Junction", "Lugbe Phase 2", "Kafe Junction"],
      Kuje: ["Kuje Market", "Kuje Junction", "Kwali Road Junction", "Kuje Town Center"],
      Nyanya: ["Nyanya Market", "Mararaba Junction", "New Nyanya Junction", "Nyanya Garage"],
      Bwari: ["Bwari Junction", "Bwari Market", "Bwari Area Council", "Bwari-Kubwa Road"],
      Gwagwalada: ["Gwagwalada Junction", "Gwagwalada Market", "UniAbuja Gate", "Gwagwalada Garage"],
      Karu: ["Karu Junction", "Karu Site", "Mararaba Junction", "New Karu"],
      Jabi: ["Jabi Motor Park", "Jabi Lake Junction", "Transcorp Junction", "Dakibiyu Junction"],
      "Central Area": ["City Gate Junction", "Eagle Square Junction", "NTA Junction", "Three Arms Zone"],
    },
  },
  // KANO STATE
  Kano: {
    areas: ["Kano Municipal", "Fagge", "Dala", "Gwale", "Tarauni", "Nasarawa", "Ungogo", "Kumbotso", "Tofa", "Rogo", "Dawakin Tofa", "Bunkure"],
    junctions: {
      "Kano Municipal": ["Sabon Gari Market", "Yankaba Junction", "Bata Junction", "Kofar Mata Gate", "Post Office Junction"],
      Fagge: ["Kantin Kwari Market", "Fagge Junction", "Tuesday Market", "Rijiyar Zaki Junction"],
      Dala: ["Dala Junction", "Rijiyar Lemo", "Kofar Kabuga", "Dala Hill Area"],
      Gwale: ["Gwale Junction", "Zoo Road Junction", "Bayero University Gate", "Sharada Junction"],
      Tarauni: ["Tarauni Junction", "Farm Center", "Tarauni Market", "Tarauni LGA Office"],
      Nasarawa: ["Nasarawa Junction", "Panshekara", "Dakata Market", "New Road Junction"],
      Ungogo: ["Ungogo Market", "Ungogo Junction", "Yan Kaba Junction", "Galadanci Junction"],
      Kumbotso: ["Kumbotso Junction", "Tudun Wada", "Shanono Road", "Kumbotso Market"],
      Tofa: ["Tofa Junction", "Tofa Market", "Tofa Town Center", "Doka Junction"],
      Rogo: ["Rogo Junction", "Rogo Market", "Rogo Town", "Garko Road Junction"],
      "Dawakin Tofa": ["Dawakin Tofa Junction", "Dawakin Market", "Kwanar Junction"],
      Bunkure: ["Bunkure Junction", "Bunkure Market", "Karfi Junction"],
    },
  },
  // RIVERS STATE
  "Port Harcourt": {
    areas: ["GRA", "Trans Amadi", "Rumuola", "Woji", "Rumuokoro", "Diobu", "Borokiri", "Mile 1", "D-Line", "Eliozu", "Rumuigbo", "Obio-Akpor", "Oyigbo", "Eleme"],
    junctions: {
      GRA: ["GRA Phase 2 Junction", "Aba Road Junction", "Peter Odili Road", "Stadium Road Junction", "GRA Phase 3"],
      "Trans Amadi": ["Trans Amadi Junction", "Rumuola Road", "Industrial Layout", "Airport Road Junction"],
      Rumuola: ["Rumuola Junction", "Ada George Road", "Rumuola Bus Stop", "NTA Road Junction"],
      Woji: ["Woji Junction", "Woji Market", "Woji Road", "Elechi Beach Road"],
      Rumuokoro: ["Rumuokoro Junction", "Eastern Bypass", "Rumuokoro Market", "Ojoto Street"],
      Diobu: ["Mile 1 Market", "Diobu Junction", "Obi Wali Road", "Market Road"],
      Borokiri: ["Borokiri Junction", "Creek Road", "Borokiri Market", "Owerri Road Junction"],
      "Mile 1": ["Mile 1 Roundabout", "Nkpogu Road", "Aba Road", "Aggrey Road Junction"],
      "D-Line": ["D-Line Junction", "Forces Avenue", "Moscow Road Junction", "D-Line Market"],
      Eliozu: ["Eliozu Junction", "Rumuola-Eliozu Road", "Eliozu Market", "Shell Location"],
      Rumuigbo: ["Rumuigbo Junction", "Rumuigbo Market", "Eagle Island Road", "Iriebe Junction"],
      "Obio-Akpor": ["Obio-Akpor Junction", "Rumuokwuta", "Choba Junction", "Rukpokwu Junction"],
      Oyigbo: ["Oyigbo Junction", "Oyigbo Market", "Oyigbo Garage", "Afam Road Junction"],
      Eleme: ["Eleme Junction", "Eleme Market", "Onne Port Road", "Aleto Junction"],
    },
  },
  // OYO STATE
  Ibadan: {
    areas: ["Bodija", "Ring Road", "Challenge", "Agodi", "Ojoo", "Akinyele", "Dugbe", "Iwo Road", "Oluyole", "Egbeda", "Gbagi", "Apata", "Sango", "Agbowo", "Mokola"],
    junctions: {
      Bodija: ["Bodija Market Junction", "UI Gate Junction", "Sanyo Junction", "Bodija Estate", "Bodija-Ojoo Road"],
      "Ring Road": ["Ring Road Junction", "Lekan Salami Junction", "Molete Junction", "Agbowo Junction"],
      Challenge: ["Challenge Junction", "New Garage", "Iwo Road Junction", "Felele Junction"],
      Agodi: ["Agodi Gate Junction", "Secretariat Junction", "UCH Junction", "Oke-Ado Junction"],
      Ojoo: ["Ojoo Junction", "Lagos-Ibadan Expressway", "Ojoo Market", "Gbekuba Junction"],
      Akinyele: ["Akinyele Junction", "Moniya Junction", "Ojoo-Moniya Road", "Akobo Junction"],
      Dugbe: ["Dugbe Market Junction", "Gbagi Junction", "Lebanon Junction", "Sango Bridge"],
      "Iwo Road": ["Iwo Road Junction", "Eleiyele Junction", "Apata Junction", "Ologuneru Junction"],
      Oluyole: ["Oluyole Junction", "Oluyole Estate", "Idi-Ishin Junction", "Ekotedo Junction"],
      Egbeda: ["Egbeda Junction", "Egbeda Market", "Oja-Oba Junction", "Oke-Offa Junction"],
      Gbagi: ["Gbagi Market", "Gbagi Junction", "New Gbagi Market", "Odinjo Junction"],
      Apata: ["Apata Junction", "Apata Market", "Apata-Ganga Junction", "Idi-Oro Junction"],
      Sango: ["Sango Junction", "Sango Market", "Oke-Ado Junction", "Toll Gate Junction"],
      Agbowo: ["Agbowo Junction", "UI Second Gate", "Agbowo Shopping Complex", "Yemetu Junction"],
      Mokola: ["Mokola Junction", "Mokola Roundabout", "Cocoa House Junction", "Oke-Padre Junction"],
    },
  },
  // ENUGU STATE
  Enugu: {
    areas: ["GRA", "New Haven", "Asata", "Trans Ekulu", "Uwani", "Ogui", "Abakpa", "Independence Layout", "Coal Camp", "Achara Layout", "Emene", "Awkunanaw"],
    junctions: {
      GRA: ["GRA Junction", "Abakiliki Road", "Zik Avenue", "Presidential Road", "GRA Phase 2"],
      "New Haven": ["New Haven Junction", "Agbani Road", "Coal Camp Junction", "New Haven Market"],
      Asata: ["Asata Junction", "Upper Chime Avenue", "Nike Lake Road", "Asata Bridge"],
      "Trans Ekulu": ["Trans Ekulu Junction", "Emene Road", "Trans Ekulu Market", "Phase 1 Gate"],
      Uwani: ["Uwani Junction", "Okafor Avenue", "Ogui Road Junction", "Uwani Market"],
      Ogui: ["Ogui Junction", "New Market Road", "Ogui Nike Road", "Coal Camp Junction"],
      Abakpa: ["Abakpa Junction", "9th Mile Corner", "Abakpa Market", "Nike Road Junction"],
      "Independence Layout": ["Independence Layout Gate", "Government House Road", "Club Road", "Police Headquarters"],
      "Coal Camp": ["Coal Camp Junction", "Obiagu Road", "Zik Avenue Junction", "Milliken Hill"],
      "Achara Layout": ["Achara Junction", "Achara Market", "Agbani Road Junction", "Udi Road Junction"],
      Emene: ["Emene Junction", "Emene Market", "Industrial Layout Junction", "Airport Road"],
      Awkunanaw: ["Awkunanaw Junction", "Awkunanaw Market", "Gariki Junction", "Eke-Obinagu Road"],
    },
  },
  // EDO STATE
  Benin: {
    areas: ["GRA", "Ugbowo", "Uselu", "Ekosodin", "Ikpoba Hill", "New Benin", "Aduwawa", "Oregbeni", "Oluku", "Sapele Road", "Oba Market", "Ekiosa"],
    junctions: {
      GRA: ["Ring Road Junction", "GRA Junction", "Sapele Road", "Airport Road Junction", "Reservation Road"],
      Ugbowo: ["Ugbowo Junction", "UNIBEN Gate", "Lagos Street Junction", "Benin-Asaba Road"],
      Uselu: ["Uselu Junction", "Lagos Street", "Uselu Market", "Textile Mill Road"],
      Ekosodin: ["Ekosodin Junction", "UNIBEN Back Gate", "Ekosodin Village", "Osasogie Road"],
      "Ikpoba Hill": ["Ikpoba Hill Junction", "Airport Road", "Ikpoba Hill Market", "Upper Sakponba"],
      "New Benin": ["New Benin Market", "Mission Road Junction", "New Benin Junction", "Cemetery Road"],
      Aduwawa: ["Aduwawa Junction", "Aduwawa Market", "Benin-Agbor Road", "Idunmwowina Road"],
      Oregbeni: ["Oregbeni Junction", "Housing Estate Gate", "Oregbeni Market", "Esigie Road"],
      Oluku: ["Oluku Junction", "Oluku Market", "Ihama Road Junction", "Iguosa Junction"],
      "Sapele Road": ["Sapele Road Junction", "Eyaen Junction", "Evbuobanosa Junction", "Irhirhi Junction"],
      "Oba Market": ["Oba Market Junction", "Akpakpava Road", "Oba Market Gate", "Akenzua Junction"],
      Ekiosa: ["Ekiosa Junction", "Ekiosa Market", "Dawson Road", "Igun Street Junction"],
    },
  },
  // ANAMBRA STATE
  Onitsha: {
    areas: ["Onitsha Main Market", "Fegge", "Woliwo", "Odoakpu", "GRA", "Inland Town", "Awada", "Obosi", "Oguta Road", "Niger Bridge Head"],
    junctions: {
      "Onitsha Main Market": ["Main Market Junction", "Upper Iweka Road", "Iweka Junction", "Bridgehead Junction"],
      Fegge: ["Fegge Junction", "Fegge Market", "Owerri Road Junction", "Venn Road"],
      Woliwo: ["Woliwo Junction", "Woliwo Market", "Oguta Road Junction", "Modebe Avenue"],
      Odoakpu: ["Odoakpu Junction", "Odoakpu Market", "Oba Road Junction", "Awka Road Junction"],
      GRA: ["GRA Junction", "Enugu-Onitsha Expressway", "Bida Road Junction", "Alexander Avenue"],
      "Inland Town": ["Inland Town Junction", "Market Road Junction", "Old Market Road", "Okpoko Junction"],
      Awada: ["Awada Junction", "Awada Market", "Awada-Obosi Road", "Coscharis Junction"],
      Obosi: ["Obosi Junction", "Obosi Market", "Idemili Road", "Obosi-Onitsha Road"],
      "Oguta Road": ["Oguta Road Junction", "Oguta Road Market", "St. Charles Junction", "Owerri Road"],
      "Niger Bridge Head": ["Niger Bridge Head", "Bridge Head Market", "Asaba Junction", "End of Bridge"],
    },
  },
  // DELTA STATE
  Asaba: {
    areas: ["GRA", "Okpanam Road", "Nnebisi Road", "Summit", "Cable Point", "Infant Jesus", "Midwest Road", "DBS Road", "Ogbeogonogo", "Illah Road"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Barracks Road Junction", "Mariam Babangida Way"],
      "Okpanam Road": ["Okpanam Road Junction", "Okpanam Market", "Okpanam-Ogwashi Road", "Peter Ayadi Road"],
      "Nnebisi Road": ["Nnebisi Road Junction", "Nnebisi Market", "St. Patrick's Junction", "Asaba Stadium Junction"],
      Summit: ["Summit Junction", "Summit Bus Stop", "Summit Market", "Industrial Road Junction"],
      "Cable Point": ["Cable Point Junction", "Cable Point Market", "Niger Bridge Junction", "Riverside Junction"],
      "Infant Jesus": ["Infant Jesus Junction", "Asaba Airport Road", "Okpanam Junction", "Anwai Road Junction"],
      "Midwest Road": ["Midwest Road Junction", "Midwest Market", "DELSU Junction", "Young Shall Grow"],
      "DBS Road": ["DBS Road Junction", "DBS Market", "Bonsaac Junction", "Television Road"],
      Ogbeogonogo: ["Ogbeogonogo Market", "Ogbeogonogo Junction", "Anwai Road", "Oma Junction"],
      "Illah Road": ["Illah Road Junction", "Illah Junction", "Ogwashi Road", "Asaba Bypass"],
    },
  },
  // IMO STATE
  Owerri: {
    areas: ["Douglas Road", "Aladinma", "New Owerri", "Ikenegbu", "Orji", "Egbu", "Wetheral Road", "Port Harcourt Road", "Chukwuma Nwoha", "Amakohia"],
    junctions: {
      "Douglas Road": ["Douglas Road Junction", "Royce Road Junction", "Bank Road Junction", "Assumpta Junction"],
      Aladinma: ["Aladinma Junction", "Aladinma Market", "Uratta Road Junction", "Relief Market Junction"],
      "New Owerri": ["New Owerri Junction", "World Bank Housing", "Akwakuma Junction", "New Owerri Market"],
      Ikenegbu: ["Ikenegbu Junction", "Ikenegbu Market", "Nekede Road", "Ikenegbu Layout"],
      Orji: ["Orji Junction", "Orji Market", "Orji Town", "Oguta Road Junction"],
      Egbu: ["Egbu Junction", "Egbu Road", "Egbu Market", "Irete Junction"],
      "Wetheral Road": ["Wetheral Road Junction", "Wetheral Market", "School Road Junction", "Imo Hotel Junction"],
      "Port Harcourt Road": ["PH Road Junction", "Fire Service Junction", "Uratta Junction", "Nekede Junction"],
      "Chukwuma Nwoha": ["Chukwuma Nwoha Junction", "Zoo Road Junction", "Uratta Market", "Amakohia Junction"],
      Amakohia: ["Amakohia Junction", "Amakohia Market", "Relief Market Junction", "Poly Road Junction"],
    },
  },
  // CROSS RIVER STATE
  Calabar: {
    areas: ["GRA", "State Housing", "Edim Otop", "Calabar South", "Watt Market", "Atimbo", "Ikot Ansa", "Big Qua Town", "Lemna", "Federal Housing"],
    junctions: {
      GRA: ["GRA Junction", "Murtala Mohammed Highway", "Presidential Boulevard", "Eta Agbor Road"],
      "State Housing": ["State Housing Junction", "Parliamentary Extension", "State Housing Market", "8 Miles Junction"],
      "Edim Otop": ["Edim Otop Junction", "Edim Otop Market", "Nelson Mandela Junction", "Lemna Road"],
      "Calabar South": ["Calabar South Junction", "Watt Market Road", "Hawkins Road Junction", "Henshaw Town"],
      "Watt Market": ["Watt Market Junction", "Watt Market Main Gate", "Bogobiri Junction", "Marian Road"],
      Atimbo: ["Atimbo Junction", "Atimbo Market", "Marian Road Junction", "Atimbo-Calabar Road"],
      "Ikot Ansa": ["Ikot Ansa Junction", "UNICAL Gate", "Ikot Ansa Market", "Ikot Ansa Road"],
      "Big Qua Town": ["Big Qua Junction", "Big Qua Market", "Ekorinim Junction", "Atamunu Road"],
      Lemna: ["Lemna Junction", "Lemna Market", "8 Miles Road", "Lemna Estate Gate"],
      "Federal Housing": ["Federal Housing Junction", "FCDA Estate Gate", "Federal Housing Market", "Airport Road Junction"],
    },
  },
  // KWARA STATE
  Ilorin: {
    areas: ["GRA", "Oja-Oba", "Mandate", "Adeta", "Tanke", "Ganmo", "Challenge", "Unity", "Fate", "Kulende"],
    junctions: {
      GRA: ["GRA Junction", "Ahmadu Bello Way", "Ajanaku Junction", "Ali Gbagida Road"],
      "Oja-Oba": ["Oja-Oba Market", "Emir's Palace Junction", "Taiwo Road", "Afonja Junction"],
      Mandate: ["Mandate Junction", "Mandate Market", "Post Office Junction", "Ibrahim Taiwo Road"],
      Adeta: ["Adeta Junction", "Adeta Market", "Okaka Junction", "Kuntu Road"],
      Tanke: ["Tanke Junction", "Tanke Market", "University Road Junction", "Tanke Oke-Odo"],
      Ganmo: ["Ganmo Junction", "Ganmo Market", "Offa Garage", "Ajase-Ipo Road"],
      Challenge: ["Challenge Junction", "Challenge Market", "Sango Junction", "Lagos Road Junction"],
      Unity: ["Unity Junction", "Unity Market", "Unity Road", "Bagana Junction"],
      Fate: ["Fate Junction", "Fate Market", "Geri-Alimi Junction", "Sawmill Junction"],
      Kulende: ["Kulende Junction", "Kulende Market", "Gaa-Akanbi Road", "Kulende Village"],
    },
  },
  // KADUNA STATE
  Kaduna: {
    areas: ["Sabon Gari", "Barnawa", "Tudun Wada", "Malali", "Kawo", "Rigasa", "Makera", "Badiko", "Kakuri", "Millennium City"],
    junctions: {
      "Sabon Gari": ["Sabon Gari Market Junction", "Leventis Junction", "Post Office Roundabout", "Ahmadu Bello Way"],
      Barnawa: ["Barnawa Junction", "Barnawa Market", "Barnawa Phase 1 Gate", "Stadium Junction"],
      "Tudun Wada": ["Tudun Wada Junction", "Tudun Wada Market", "Tudun Wada North", "Television Junction"],
      Malali: ["Malali Junction", "Malali Market", "Airport Junction", "Malali GRA"],
      Kawo: ["Kawo Junction", "Kawo Market", "Kawo Bridge", "Zaria Road Junction"],
      Rigasa: ["Rigasa Junction", "Rigasa Market", "Rigasa Station", "Karji Junction"],
      Makera: ["Makera Junction", "Makera Market", "Ali Akilu Road", "Clock Tower Junction"],
      Badiko: ["Badiko Junction", "Badiko Market", "Kigo Road Junction", "Badiko Village"],
      Kakuri: ["Kakuri Junction", "Kakuri Market", "NEPA Junction", "Kakuri Industrial Area"],
      "Millennium City": ["Millennium City Gate", "Millennium City Market", "Millennium Junction", "Panteka Junction"],
    },
  },
  // OSUN STATE
  Osogbo: {
    areas: ["Oke-Fia", "Station Road", "Alekuwodo", "Igbona", "Ota-Efun", "Ayetoro", "Okuku", "Eko-Ende", "Ilesa Garage", "Lameco"],
    junctions: {
      "Oke-Fia": ["Oke-Fia Junction", "Oke-Fia Market", "Ring Road Junction", "Osun State Secretariat"],
      "Station Road": ["Station Road Junction", "Kilo Junction", "Gbongan Road Junction", "Old Garage Junction"],
      Alekuwodo: ["Alekuwodo Junction", "Alekuwodo Market", "Hospital Road Junction", "Igbona Junction"],
      Igbona: ["Igbona Junction", "Igbona Market", "Ilesha Road Junction", "Igbona Gate"],
      "Ota-Efun": ["Ota-Efun Junction", "Ota-Efun Market", "Olaiya Junction", "Stadium Junction"],
      Ayetoro: ["Ayetoro Junction", "Ayetoro Market", "Osun River Junction", "Cultural Centre Junction"],
      Okuku: ["Okuku Junction", "Okuku Market", "Iragbiji Road", "Okuku Town Center"],
      "Eko-Ende": ["Eko-Ende Junction", "Eko-Ende Market", "Ende Road", "Iwo Road Junction"],
      "Ilesa Garage": ["Ilesa Garage Junction", "Ilesa Road", "Old Ede Road", "Osun Bridge Junction"],
      Lameco: ["Lameco Junction", "Lameco Market", "Gbongan Road", "Lameco Estate"],
    },
  },
  // OGUN STATE
  Abeokuta: {
    areas: ["Oke-Mosan", "Lantoro", "Ibara", "Kuto", "Lafenwa", "Kemta", "Onikolobo", "Sapon", "Panseke", "Obantoko"],
    junctions: {
      "Oke-Mosan": ["Oke-Mosan Junction", "Government House Road", "Oke-Mosan Market", "OOPL Junction"],
      Lantoro: ["Lantoro Junction", "Lantoro Market", "Ijeun Road Junction", "Alemeru Junction"],
      Ibara: ["Ibara Junction", "Ibara Market", "Ibara Housing Estate", "Stadium Road Junction"],
      Kuto: ["Kuto Junction", "Kuto Market", "Idi-Aba Junction", "Custom Area Junction"],
      Lafenwa: ["Lafenwa Junction", "Lafenwa Market", "Ago-Ika Junction", "Eleweran Junction"],
      Kemta: ["Kemta Junction", "Kemta Market", "Kemta Estate Gate", "Totoro Junction"],
      Onikolobo: ["Onikolobo Junction", "Onikolobo Market", "Adigbe Junction", "Alabata Road"],
      Sapon: ["Sapon Junction", "Sapon Market", "Itoku Junction", "Sango Road Junction"],
      Panseke: ["Panseke Junction", "Panseke Market", "Panseke Motor Park", "Sotitobire Junction"],
      Obantoko: ["Obantoko Junction", "Obantoko Market", "Odeda Road Junction", "Federal Low Cost Housing"],
    },
  },
  // PLATEAU STATE
  "Jos": {
    areas: ["GRA", "Tudun Wada", "Nassarawa Gwong", "Jenta", "Angwan Rogo", "Kabong", "Zarmaganda", "Angwan Rukuba", "Apata", "Bukuru"],
    junctions: {
      GRA: ["GRA Junction", "Yakubu Gowon Way", "Ahmadu Bello Way Junction", "Hill Station Junction"],
      "Tudun Wada": ["Tudun Wada Junction", "Tudun Wada Market", "Bauchi Road Junction", "Polo Ground Junction"],
      "Nassarawa Gwong": ["Nassarawa Junction", "Nassarawa Market", "Anglo Junction", "Taffy Junction"],
      Jenta: ["Jenta Junction", "Jenta Market", "Jenta Adamu", "Jenta Mangoro Junction"],
      "Angwan Rogo": ["Angwan Rogo Junction", "Angwan Rogo Market", "Gada Biyu Junction", "Pwajak Junction"],
      Kabong: ["Kabong Junction", "Kabong Market", "Kabong Estate Gate", "Rayfield Junction"],
      Zarmaganda: ["Zarmaganda Junction", "Zarmaganda Market", "Farin Gada Junction", "Dadin Kowa Junction"],
      "Angwan Rukuba": ["Angwan Rukuba Junction", "Rukuba Road Junction", "Angwan Rukuba Market", "Vom Road Junction"],
      Apata: ["Apata Junction", "Apata Market", "Liberty Dam Road", "Fan Milk Junction"],
      Bukuru: ["Bukuru Junction", "Bukuru Market", "Steel Company Junction", "Bukuru Express"],
    },
  },
  // BORNO STATE
  Maiduguri: {
    areas: ["Bulumkutu", "Gwange", "Fezzan", "GRA", "Custom", "Shehuri", "Lamisula", "Old Maiduguri", "Yerwa", "Gomari"],
    junctions: {
      Bulumkutu: ["Bulumkutu Junction", "Bulumkutu Market", "Bulumkutu Gate", "Baga Road Junction"],
      Gwange: ["Gwange Junction", "Gwange Market", "Gwange 1 Gate", "Moduganari Junction"],
      Fezzan: ["Fezzan Junction", "Fezzan Market", "Fezzan Estate", "Kashim Ibrahim Road"],
      GRA: ["GRA Junction", "Government House Road", "Shehu Laminu Way", "NNPC Junction"],
      Custom: ["Custom Junction", "Custom Area Market", "Mele Kime Junction", "Baga Road"],
      Shehuri: ["Shehuri Junction", "Shehuri Market", "Shehuri North Gate", "Damboa Road Junction"],
      Lamisula: ["Lamisula Junction", "Lamisula Market", "Lamisula Estate", "Ngomari Junction"],
      "Old Maiduguri": ["Old Maiduguri Junction", "Monday Market", "Bolori Junction", "Wulari Junction"],
      Yerwa: ["Yerwa Junction", "Yerwa Market", "State Low Cost", "Ekari Junction"],
      Gomari: ["Gomari Junction", "Gomari Market", "Gomari Estate", "Ngarannam Junction"],
    },
  },
  // SOKOTO STATE
  Sokoto: {
    areas: ["GRA", "Gandu", "Runjin Sambo", "Mabera", "Tudun Wada", "Arkilla", "Kofar Rini", "Gawon Nama", "Kanwa", "Bado"],
    junctions: {
      GRA: ["GRA Junction", "Sultan Abubakar Road", "Sokoto-Gusau Road", "Waziri Ibrahim Way"],
      Gandu: ["Gandu Junction", "Gandu Market", "Central Bank Junction", "Post Office Junction"],
      "Runjin Sambo": ["Runjin Sambo Junction", "Runjin Sambo Market", "Aliyu Jodi Road", "Enugu Road Junction"],
      Mabera: ["Mabera Junction", "Mabera Market", "Mabera Estate Gate", "Gidan Igwe Junction"],
      "Tudun Wada": ["Tudun Wada Junction", "Tudun Wada Market", "Yan Tebur Junction", "Kankarofi Junction"],
      Arkilla: ["Arkilla Junction", "Arkilla Market", "Arkilla Estate", "New Airport Road"],
      "Kofar Rini": ["Kofar Rini Junction", "Kofar Rini Market", "Sokoto Museum Road", "Giginya Junction"],
      "Gawon Nama": ["Gawon Nama Junction", "Gawon Nama Market", "Gawon Nama Estate", "Bypass Junction"],
      Kanwa: ["Kanwa Junction", "Kanwa Market", "Kanwa Road", "Wamakko Junction"],
      Bado: ["Bado Junction", "Bado Market", "Bado Road", "Kalambaina Junction"],
    },
  },
  // NIGER STATE
  Minna: {
    areas: ["Bosso", "Chanchaga", "Tunga", "Gwari", "Maikunkele", "Kpakungu", "Dutsen Kura", "Tayi", "Kofar Gaya", "Fadikpe"],
    junctions: {
      Bosso: ["Bosso Junction", "Bosso Market", "Bosso Estate Gate", "FMC Junction"],
      Chanchaga: ["Chanchaga Junction", "Chanchaga Market", "Chanchaga LGA Office", "Efaco Junction"],
      Tunga: ["Tunga Junction", "Tunga Market", "Tunga Square", "Post Office Junction"],
      Gwari: ["Gwari Market Junction", "Gwari Market Gate", "New Market Junction", "Mobil Junction"],
      Maikunkele: ["Maikunkele Junction", "Maikunkele Market", "FUT Junction", "Kwamba Junction"],
      Kpakungu: ["Kpakungu Junction", "Kpakungu Market", "Kpakungu Estate", "Gidan Mangoro Junction"],
      "Dutsen Kura": ["Dutsen Kura Junction", "Dutsen Kura Market", "Kpakungu Road", "CBN Junction"],
      Tayi: ["Tayi Junction", "Tayi Market", "Tayi Estate", "Shiroro Road Junction"],
      "Kofar Gaya": ["Kofar Gaya Junction", "Old Market Junction", "Emir's Palace Junction", "Nupe Road"],
      Fadikpe: ["Fadikpe Junction", "Fadikpe Market", "Fadikpe Estate", "Airport Road Junction"],
    },
  },
  // AKWA IBOM STATE
  "Uyo": {
    areas: ["GRA", "Itam", "Ewet Housing", "Shelter Afrique", "Wellington Bassey Way", "Aka Road", "Ring Road", "Abak Road", "Ikot Ekpene Road", "Stadium"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Abak Road Junction", "Udo Eduok Avenue"],
      Itam: ["Itam Junction", "Itam Market", "Itam Industrial Area", "Nung Udoe Road"],
      "Ewet Housing": ["Ewet Housing Junction", "Ewet Housing Market", "Ewet Hospital Junction", "Urua Ekpa Junction"],
      "Shelter Afrique": ["Shelter Afrique Junction", "Shelter Afrique Market", "Shelter Afrique Estate Gate", "Use Offot Junction"],
      "Wellington Bassey Way": ["Wellington Bassey Junction", "CBN Junction", "Uyo Teaching Hospital Junction", "Ikpa Road Junction"],
      "Aka Road": ["Aka Road Junction", "Aka Road Market", "Aka Itiam Junction", "Unity Road Junction"],
      "Ring Road": ["Ring Road Junction", "Ring Road Market", "Uko Inyang Street", "Oron Road Junction"],
      "Abak Road": ["Abak Road Junction", "Abak Road Market", "Ikot Ekpene Junction", "Afaha Ube Junction"],
      "Ikot Ekpene Road": ["Ikot Ekpene Road Junction", "Ikot Ekpene Market", "Ikot Ekpene Garage", "Abak Junction"],
      Stadium: ["Stadium Junction", "Stadium Market", "IBB Boulevard", "Uyo Stadium Gate"],
    },
  },
  // BAUCHI STATE
  Bauchi: {
    areas: ["GRA", "Wunti", "Makama", "Dan Iya", "Yelwa", "Wanka", "Nassarawa", "Dan Musa", "Anguwan Jama'a", "Gwallameji"],
    junctions: {
      GRA: ["GRA Junction", "Yakubu Gowon Road", "Government House Junction", "Jos Road Junction"],
      Wunti: ["Wunti Junction", "Wunti Market", "Wunti Road", "Babangida Square Junction"],
      Makama: ["Makama Junction", "Makama Market", "Makama Road", "Abubakar Tafawa Balewa Way"],
      "Dan Iya": ["Dan Iya Junction", "Dan Iya Market", "Zaranda Junction", "Dan Iya Road"],
      Yelwa: ["Yelwa Junction", "Yelwa Market", "Old Airport Road", "Fadaman Mada Junction"],
      Wanka: ["Wanka Junction", "Wanka Market", "Wanka Road", "Bayan Tasha Junction"],
      Nassarawa: ["Nassarawa Junction", "Nassarawa Market", "Dass Road Junction", "Nassarawa Road"],
      "Dan Musa": ["Dan Musa Junction", "Dan Musa Market", "Ningi Road Junction", "Post Office Junction"],
      "Anguwan Jama'a": ["Anguwan Jama'a Junction", "Anguwan Jama'a Market", "Tangazam Junction"],
      Gwallameji: ["Gwallameji Junction", "Gwallameji Market", "Gwallameji Road", "Katagum Road Junction"],
    },
  },
  // BENUE STATE
  Makurdi: {
    areas: ["GRA", "High Level", "North Bank", "Wurukum", "Judges Quarters", "Ankpa Quarters", "Wailomayo", "Modern Market", "Bureau", "Fiidi"],
    junctions: {
      GRA: ["GRA Junction", "Joseph Sarwuan Tarka Way", "Ahmadu Bello Way", "George Akume Road"],
      "High Level": ["High Level Junction", "High Level Market", "University Road Junction", "BSUTH Junction"],
      "North Bank": ["North Bank Junction", "North Bank Market", "River Benue Bridge Junction", "North Bank Garage"],
      Wurukum: ["Wurukum Junction", "Wurukum Market", "Wurukum Roundabout", "Otukpo Road Junction"],
      "Judges Quarters": ["Judges Quarters Junction", "Judges Quarters Market", "Court of Appeal Junction", "Clergy House Road"],
      "Ankpa Quarters": ["Ankpa Quarters Junction", "Ankpa Market", "Aper Aku Stadium Junction", "Ankpa Road"],
      Wailomayo: ["Wailomayo Junction", "Wailomayo Market", "Wannune Road", "Tarka Foundation Road"],
      "Modern Market": ["Modern Market Junction", "Modern Market Gate", "Nyiman Junction", "High Level Road"],
      Bureau: ["Bureau Junction", "Bureau Market", "Bureau Estate", "Airport Road Junction"],
      Fiidi: ["Fiidi Junction", "Fiidi Market", "Fiidi Estate", "Gyado Villa Road"],
    },
  },
  // TARABA STATE
  Jalingo: {
    areas: ["GRA", "Turaki", "Yelwa", "Barade", "Sintali", "Majidadi", "Commercial Area", "Kasada", "Sabongari", "Karim Lamido Road"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Sani Abacha Way", "NITEL Junction"],
      Turaki: ["Turaki Junction", "Turaki Market", "Turaki Estate", "Jalingo Road Junction"],
      Yelwa: ["Yelwa Junction", "Yelwa Market", "Yelwa Road", "Wukari Road Junction"],
      Barade: ["Barade Junction", "Barade Market", "Barade Estate", "Yola Road Junction"],
      Sintali: ["Sintali Junction", "Sintali Market", "Sintali Road", "Bali Road Junction"],
      Majidadi: ["Majidadi Junction", "Majidadi Market", "Majidadi Estate", "TARABA Junction"],
      "Commercial Area": ["Commercial Junction", "Main Market", "Old Motor Park", "Bank Road Junction"],
      Kasada: ["Kasada Junction", "Kasada Market", "Kasada Road", "Kona Junction"],
      Sabongari: ["Sabongari Junction", "Sabongari Market", "New Motor Park Junction", "Sabongari Road"],
      "Karim Lamido Road": ["Karim Lamido Junction", "Sardauna Road", "Gashaka Road", "Lau Road Junction"],
    },
  },
  // ADAMAWA STATE
  Yola: {
    areas: ["GRA", "Jimeta", "Doubeli", "Demsawo", "Karewa", "Nassarawo", "Luggere", "Bekaji", "Nyibango", "Adarawo"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Aliyu Musdafa Road", "Atiku Abubakar Way"],
      Jimeta: ["Jimeta Junction", "Jimeta Market", "Bank Road Junction", "Post Office Junction"],
      Doubeli: ["Doubeli Junction", "Doubeli Market", "Old Airport Road", "Doubeli Estate Gate"],
      Demsawo: ["Demsawo Junction", "Demsawo Market", "Demsawo Estate", "Mubi Road Junction"],
      Karewa: ["Karewa Junction", "Karewa Market", "Karewa Estate", "Numan Road Junction"],
      Nassarawo: ["Nassarawo Junction", "Nassarawo Market", "Nassarawo Estate", "Ngurore Road"],
      Luggere: ["Luggere Junction", "Luggere Market", "Luggere Road", "Fufore Road Junction"],
      Bekaji: ["Bekaji Junction", "Bekaji Market", "Bekaji Estate", "New Airport Road Junction"],
      Nyibango: ["Nyibango Junction", "Nyibango Market", "Nyibango Road", "Lamurde Junction"],
      Adarawo: ["Adarawo Junction", "Adarawo Market", "Adarawo Road", "Song Road Junction"],
    },
  },
  // KEBBI STATE
  Birnin_Kebbi: {
    areas: ["GRA", "Gwandu Road", "Kalgo", "Zuru Road", "Anguwan Kanawa", "Ambursa", "Jega Road", "Danko", "Kardi", "Wasagu Road"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Sultan Muhammadu Sama Way", "Kebbi Road Junction"],
      "Gwandu Road": ["Gwandu Road Junction", "Gwandu Market", "Gwandu Junction", "Old Airport Road"],
      Kalgo: ["Kalgo Junction", "Kalgo Market", "Kalgo Town", "Argungu Road Junction"],
      "Zuru Road": ["Zuru Road Junction", "Zuru Market", "Zuru Junction", "Yauri Road Junction"],
      "Anguwan Kanawa": ["Anguwan Kanawa Junction", "Anguwan Kanawa Market", "Dakingari Road", "Suru Junction"],
      Ambursa: ["Ambursa Junction", "Ambursa Market", "Ambursa Estate", "Aliero Junction"],
      "Jega Road": ["Jega Road Junction", "Jega Market", "Jega Junction", "Denden Road"],
      Danko: ["Danko Junction", "Danko Market", "Danko Estate", "Maiyama Road"],
      Kardi: ["Kardi Junction", "Kardi Market", "Kardi Estate", "Augie Road Junction"],
      "Wasagu Road": ["Wasagu Road Junction", "Wasagu Market", "Wasagu Junction", "Bunza Road"],
    },
  },
  // ZAMFARA STATE
  Gusau: {
    areas: ["GRA", "Tudun Wada", "Sabon Gari", "Rijiyar Lemo", "Anguwan Juma", "Fly-over", "Nasiha", "Marafa", "Gada", "Ruwan Bore"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Sultan Attahiru Road", "Bank Road Junction"],
      "Tudun Wada": ["Tudun Wada Junction", "Tudun Wada Market", "Tudun Wada Road", "Post Office Junction"],
      "Sabon Gari": ["Sabon Gari Junction", "Sabon Gari Market", "Motor Park Junction", "Sabon Gari Road"],
      "Rijiyar Lemo": ["Rijiyar Lemo Junction", "Rijiyar Lemo Market", "Rijiyar Lemo Estate", "Sokoto Road Junction"],
      "Anguwan Juma": ["Anguwan Juma Junction", "Anguwan Juma Market", "Friday Mosque Junction", "Talata Mafara Road"],
      "Fly-over": ["Fly-over Junction", "Fly-over Market", "Kankara Road Junction", "Old Hospital Road"],
      Nasiha: ["Nasiha Junction", "Nasiha Market", "Nasiha Estate", "Bin Yamusa Road"],
      Marafa: ["Marafa Junction", "Marafa Market", "Marafa Estate", "Bakura Road Junction"],
      Gada: ["Gada Junction", "Gada Market", "Gada Road", "Kaura Namoda Road Junction"],
      "Ruwan Bore": ["Ruwan Bore Junction", "Ruwan Bore Market", "Ruwan Bore Road", "Zurmi Road Junction"],
    },
  },
  // NASARAWA STATE
  Lafia: {
    areas: ["GRA", "Tudun Gwandara", "Makama", "Sabon Lafia", "Bukan Sidi", "New Market", "Shabu", "Jama'a", "Kwandere", "Angwan Lambu"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Bola Ahmed Tinubu Road", "CBN Junction"],
      "Tudun Gwandara": ["Tudun Gwandara Junction", "Tudun Gwandara Market", "NTA Road", "Tudun Gwandara Estate"],
      Makama: ["Makama Junction", "Makama Market", "Makama Road", "Akwanga Road Junction"],
      "Sabon Lafia": ["Sabon Lafia Junction", "Sabon Lafia Market", "Sabon Lafia Road", "Old Motor Park Junction"],
      "Bukan Sidi": ["Bukan Sidi Junction", "Bukan Sidi Market", "Bukan Sidi Estate", "Shendam Road Junction"],
      "New Market": ["New Market Junction", "New Market Gate", "New Market Road", "Nasarawa Road Junction"],
      Shabu: ["Shabu Junction", "Shabu Market", "Shabu Estate", "Jos Road Junction"],
      "Jama'a": ["Jama'a Junction", "Jama'a Market", "Jama'a Road", "Keffi Road Junction"],
      Kwandere: ["Kwandere Junction", "Kwandere Market", "Kwandere Estate", "Doma Road Junction"],
      "Angwan Lambu": ["Angwan Lambu Junction", "Angwan Lambu Market", "Angwan Lambu Estate", "Awe Road Junction"],
    },
  },
  // KOGI STATE
  Lokoja: {
    areas: ["GRA", "Old Market", "Adankolo", "Felele", "Ganaja", "Zango", "Paparanda", "Natako", "Kabawa", "Crusher"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Ibrahim Attah Road", "CBN Junction"],
      "Old Market": ["Old Market Junction", "Old Market Gate", "Clock Tower Junction", "Lugard House Road"],
      Adankolo: ["Adankolo Junction", "Adankolo Market", "Niger River Bridge Junction", "Adankolo Estate"],
      Felele: ["Felele Junction", "Felele Market", "Felele Estate", "Ajaokuta Road Junction"],
      Ganaja: ["Ganaja Junction", "Ganaja Market", "Ganaja Estate", "Idah Road Junction"],
      Zango: ["Zango Junction", "Zango Market", "Zango Road", "Confluence University Junction"],
      Paparanda: ["Paparanda Junction", "Paparanda Market", "Paparanda Estate", "Okene Road Junction"],
      Natako: ["Natako Junction", "Natako Market", "Natako Estate", "Kabba Road Junction"],
      Kabawa: ["Kabawa Junction", "Kabawa Market", "Kabawa Estate", "Jakara Road Junction"],
      Crusher: ["Crusher Junction", "Crusher Market", "Crusher Estate", "Koton Karfe Road Junction"],
    },
  },
  // EKITI STATE
  "Ado-Ekiti": {
    areas: ["GRA", "Oke-Ila", "Ijigbo", "Basiri", "Okeyinmi", "Iworoko Road", "Erekesan", "Adehipo", "Afao Road", "Oke-Bola"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Bank Road Junction", "CBN Junction"],
      "Oke-Ila": ["Oke-Ila Junction", "Oke-Ila Market", "Oke-Ila Estate", "Ikere Road Junction"],
      Ijigbo: ["Ijigbo Junction", "Ijigbo Market", "Ijigbo Road", "Emure Road Junction"],
      Basiri: ["Basiri Junction", "Basiri Market", "Basiri Estate", "Efon Road Junction"],
      Okeyinmi: ["Okeyinmi Junction", "Okeyinmi Market", "EKSU Gate Junction", "Stadium Road Junction"],
      "Iworoko Road": ["Iworoko Road Junction", "Iworoko Market", "Iworoko Gate", "Omisanjana Junction"],
      Erekesan: ["Erekesan Junction", "Erekesan Market", "Erekesan Road", "Oja-Bisi Junction"],
      Adehipo: ["Adehipo Junction", "Adehipo Market", "Adehipo Estate", "Ajilosun Junction"],
      "Afao Road": ["Afao Road Junction", "Afao Market", "Afao Estate", "Ido Ile Road Junction"],
      "Oke-Bola": ["Oke-Bola Junction", "Oke-Bola Market", "Oke-Bola Estate", "Oja-Oba Junction"],
    },
  },
  // ONDO STATE
  Akure: {
    areas: ["GRA", "Oba-Ile", "Alagbaka", "Ondo Road", "Ijoka", "Oke-Ijebu", "Ijapo", "Shagari Village", "Eleganza", "Oyemekun"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Oyemekun Road", "FUTA Junction"],
      "Oba-Ile": ["Oba-Ile Junction", "Oba-Ile Market", "Oba-Ile Estate", "Ondo Road Junction"],
      Alagbaka: ["Alagbaka Junction", "Alagbaka Market", "Alagbaka Estate", "NEPA Junction"],
      "Ondo Road": ["Ondo Road Junction", "Ondo Road Market", "Ondo Garage", "Ade Leemo Junction"],
      Ijoka: ["Ijoka Junction", "Ijoka Market", "Ijoka Road", "Uke Junction"],
      "Oke-Ijebu": ["Oke-Ijebu Junction", "Oke-Ijebu Market", "Oke-Ijebu Estate", "Church Road Junction"],
      Ijapo: ["Ijapo Junction", "Ijapo Market", "Ijapo Estate", "Housing Junction"],
      "Shagari Village": ["Shagari Junction", "Shagari Market", "Shagari Estate", "Airport Road Junction"],
      Eleganza: ["Eleganza Junction", "Eleganza Market", "Eleganza Estate", "Oba Afunbiowo Junction"],
      Oyemekun: ["Oyemekun Junction", "Oyemekun Road Market", "FUTA Back Gate", "Oyemekun Estate"],
    },
  },
  // OGUN - SAGAMU
  Sagamu: {
    areas: ["Agbowa", "Ita-Osanyin", "Kobape", "Soyoye", "Isale-Osun", "Eruwanpe", "Remo-North", "Iperu", "Ogere", "Ilishan"],
    junctions: {
      Agbowa: ["Agbowa Junction", "Agbowa Market", "Agbowa Gate", "Lagos Road Junction"],
      "Ita-Osanyin": ["Ita-Osanyin Junction", "Ita-Osanyin Market", "Sagamu Interchange", "Benin Road Junction"],
      Kobape: ["Kobape Junction", "Kobape Market", "Kobape Road", "Abeokuta Road Junction"],
      Soyoye: ["Soyoye Junction", "Soyoye Market", "Soyoye Estate", "Shagamu Central"],
      "Isale-Osun": ["Isale-Osun Junction", "Isale-Osun Market", "Isale-Osun Road", "Makun Junction"],
      Eruwanpe: ["Eruwanpe Junction", "Eruwanpe Market", "Eruwanpe Estate", "Obafemi Owode Road"],
      "Remo-North": ["Remo-North Junction", "Remo-North Market", "Remo North LGA Office", "Isara Road"],
      Iperu: ["Iperu Junction", "Iperu Market", "Iperu Town Center", "Iperu Remo Gate"],
      Ogere: ["Ogere Junction", "Ogere Remo Market", "Ogere Gate", "Lagos-Ibadan Expressway"],
      Ilishan: ["Ilishan Junction", "Ilishan Market", "Babcock University Gate", "Ilishan Remo Road"],
    },
  },
  // BAYELSA STATE
  Yenagoa: {
    areas: ["Opolo", "Amarata", "Agudama", "Swali", "Etegwe", "Biogbolo", "Kpansia", "Tombia", "Imgbi", "Ovom"],
    junctions: {
      Opolo: ["Opolo Junction", "Opolo Market", "Opolo Estate", "Mbiama Road Junction"],
      Amarata: ["Amarata Junction", "Amarata Market", "Amarata Estate", "Government House Road"],
      Agudama: ["Agudama Junction", "Agudama Market", "Agudama Estate", "CBN Junction"],
      Swali: ["Swali Market Junction", "Swali Market Gate", "Swali Junction", "Epie Creek Junction"],
      Etegwe: ["Etegwe Junction", "Etegwe Market", "Etegwe Estate", "Oxbow Lake Junction"],
      Biogbolo: ["Biogbolo Junction", "Biogbolo Market", "NDDC Junction", "Stadium Road Junction"],
      Kpansia: ["Kpansia Junction", "Kpansia Market", "Kpansia Estate", "Airport Road Junction"],
      Tombia: ["Tombia Junction", "Tombia Market", "Tombia Estate", "Sagbama Road Junction"],
      Imgbi: ["Imgbi Junction", "Imgbi Market", "Imgbi Estate", "Ekeki Junction"],
      Ovom: ["Ovom Junction", "Ovom Market", "Ovom Estate", "Biseni Junction"],
    },
  },
  // ABIA STATE
  Umuahia: {
    areas: ["GRA", "Ubani", "Ehimiri", "Azikiwe Road", "Ikot Ekpene Road", "Aba Road", "Milverton Road", "Owerri Road", "Bende Road", "Umuhia North"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Bende Road Junction", "Ikot Ekpene Road"],
      Ubani: ["Ubani Junction", "Ubani Market", "Ubani Estate", "Aba Road Junction"],
      Ehimiri: ["Ehimiri Junction", "Ehimiri Market", "Ehimiri Estate", "Nkwoegwu Junction"],
      "Azikiwe Road": ["Azikiwe Road Junction", "Azikiwe Road Market", "Nnamdi Azikiwe Road", "Warehouse Junction"],
      "Ikot Ekpene Road": ["Ikot Ekpene Road Junction", "Ikot Ekpene Market", "Afara Road Junction", "Umuwoma Junction"],
      "Aba Road": ["Aba Road Junction", "Aba Road Market", "Aba Garage", "Osisioma Junction"],
      "Milverton Road": ["Milverton Road Junction", "Milverton Market", "Milverton Estate", "Old Umuahia Road"],
      "Owerri Road": ["Owerri Road Junction", "Owerri Road Market", "Owerri Garage", "Umuahia South Junction"],
      "Bende Road": ["Bende Road Junction", "Bende Market", "Bende Road Estate", "Uzuakoli Road Junction"],
      "Umuhia North": ["Umuhia North Junction", "North Market", "Ibeku Junction", "Afaraukwu Junction"],
    },
  },
  // EBONYI STATE
  Abakaliki: {
    areas: ["GRA", "Kpirikpiri", "Mile 50", "Afikpo Road", "Ogoja Road", "Waterworks", "Azugwu", "Presco Campus", "Coal Camp", "Onueke Road"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "David Umahi Boulevard", "International Market Junction"],
      Kpirikpiri: ["Kpirikpiri Junction", "Kpirikpiri Market", "Kpirikpiri Estate", "Enugu Road Junction"],
      "Mile 50": ["Mile 50 Junction", "Mile 50 Market", "Abakaliki Ring Road", "Ogoja Road Junction"],
      "Afikpo Road": ["Afikpo Road Junction", "Afikpo Market", "Afikpo Garage", "Ezza Road Junction"],
      "Ogoja Road": ["Ogoja Road Junction", "Ogoja Market", "Ogoja Garage", "Cross River Road Junction"],
      Waterworks: ["Waterworks Junction", "Waterworks Market", "Waterworks Estate", "Iyioji Road"],
      Azugwu: ["Azugwu Junction", "Azugwu Market", "Azugwu Estate", "Nkalagu Road Junction"],
      "Presco Campus": ["Presco Campus Junction", "EBSU Gate Junction", "Presco Estate", "Campus Road"],
      "Coal Camp": ["Coal Camp Junction", "Coal Camp Market", "Coal Camp Estate", "Amachi Road Junction"],
      "Onueke Road": ["Onueke Road Junction", "Onueke Market", "Onueke Garage", "Ezza South Junction"],
    },
  },
  // GOMBE STATE
  Gombe: {
    areas: ["GRA", "Tudun Wada", "Jekadafari", "Indabawa", "Pantami", "Bajoga Road", "Dukku Road", "Biu Road", "Federal Low Cost", "New Layout"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Ribadu Road", "Biu Road Junction"],
      "Tudun Wada": ["Tudun Wada Junction", "Tudun Wada Market", "College Road Junction", "Post Office Junction"],
      Jekadafari: ["Jekadafari Junction", "Jekadafari Market", "Jekadafari Estate", "Mele Junction"],
      Indabawa: ["Indabawa Junction", "Indabawa Market", "Indabawa Estate", "Kaltungo Road Junction"],
      Pantami: ["Pantami Junction", "Pantami Market", "Pantami Estate", "Pantami Motor Park"],
      "Bajoga Road": ["Bajoga Road Junction", "Bajoga Market", "Bajoga Garage", "Funakaye Road"],
      "Dukku Road": ["Dukku Road Junction", "Dukku Market", "Dukku Garage", "Funakaye Junction"],
      "Biu Road": ["Biu Road Junction", "Biu Market", "Biu Garage", "Gombe Lake Junction"],
      "Federal Low Cost": ["Federal Low Cost Junction", "Low Cost Market", "Low Cost Estate Gate", "Ring Road Junction"],
      "New Layout": ["New Layout Junction", "New Layout Market", "New Layout Estate", "Township Road Junction"],
    },
  },
  // YOBE STATE
  Damaturu: {
    areas: ["GRA", "Old Town", "New Town", "Fika Road", "Gashua Road", "Nguru Road", "Biu Road", "Government Housing", "Barracks", "Wadai"],
    junctions: {
      GRA: ["GRA Junction", "Government House Road", "Mahmud Aliyu Shinkafi Road", "CBN Junction"],
      "Old Town": ["Old Town Junction", "Old Town Market", "Monday Market Junction", "Emir's Palace Road"],
      "New Town": ["New Town Junction", "New Town Market", "Post Office Junction", "New Town Estate"],
      "Fika Road": ["Fika Road Junction", "Fika Market", "Fika Garage", "Gujba Road Junction"],
      "Gashua Road": ["Gashua Road Junction", "Gashua Market", "Gashua Garage", "Nguru Road Junction"],
      "Nguru Road": ["Nguru Road Junction", "Nguru Market", "Nguru Garage", "Karasuwa Road Junction"],
      "Biu Road": ["Biu Road Junction", "Biu Market", "Biu Garage", "Borno Road Junction"],
      "Government Housing": ["Government Housing Junction", "Government Housing Market", "GHE Gate", "Stadium Road Junction"],
      Barracks: ["Barracks Junction", "Barracks Market", "Military Barracks Gate", "Maiduguri Road Junction"],
      Wadai: ["Wadai Junction", "Wadai Market", "Wadai Estate", "Machina Road Junction"],
    },
  },
};

const DELIVERY_DAYS = {
  Lagos: 2, Abuja: 3, Kano: 4, "Port Harcourt": 3, Ibadan: 3, Enugu: 4,
  Benin: 4, Onitsha: 4, Asaba: 4, Owerri: 3, Calabar: 5, Ilorin: 3,
  Kaduna: 4, Osogbo: 3, Abeokuta: 3, Jos: 4, Maiduguri: 6, Sokoto: 6,
  Minna: 4, Uyo: 5, Bauchi: 5, Makurdi: 5, Jalingo: 6, Yola: 6,
  Birnin_Kebbi: 6, Gusau: 6, Lafia: 4, Lokoja: 4, "Ado-Ekiti": 4,
  Akure: 4, Sagamu: 3, Yenagoa: 5, Umuahia: 4, Abakaliki: 5,
  Gombe: 5, Damaturu: 6,
};

const CITY_DISPLAY_NAMES = {
  Birnin_Kebbi: "Birnin Kebbi",
};

function getDeliveryDate(city) {
  const days = DELIVERY_DAYS[city] || 5;
  const date = new Date();
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) added++;
  }
  return date.toLocaleDateString("en-NG", { weekday: "long", month: "long", day: "numeric" });
}

export { getDeliveryDate };

export default function DeliveryWizard({ onComplete, onCancel }) {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [junction, setJunction] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const cities = Object.keys(NIGERIA_DATA);
  const filteredCities = cities.filter(c =>
    (CITY_DISPLAY_NAMES[c] || c).toLowerCase().includes(citySearch.toLowerCase())
  );
  const areas = city ? NIGERIA_DATA[city]?.areas || [] : [];
  const junctions = area ? NIGERIA_DATA[city]?.junctions[area] || [] : [];

  const displayCity = (c) => CITY_DISPLAY_NAMES[c] || c;

  const handleFinish = () => {
    onComplete({
      city: displayCity(city),
      area,
      junction,
      houseAddress,
      deliveryDate: getDeliveryDate(city),
      fullAddress: `${houseAddress}, near ${junction}, ${area}, ${displayCity(city)}`,
    });
  };

  const steps = ["City", "Area", "Junction", "Address"];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4 sm:pb-0">
      <div className="w-full max-w-lg bg-surface-400 rounded-3xl border border-white/8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gold-500 font-medium uppercase tracking-widest">Delivery Details</p>
              <h2 className="text-stone-100 font-semibold text-lg mt-0.5">Where should we deliver?</h2>
            </div>
            <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Step indicators */}
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center gap-1.5 ${i + 1 <= step ? "opacity-100" : "opacity-30"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0 ${i + 1 < step ? "bg-gold-500 text-surface-500" : i + 1 === step ? "bg-gold-500/20 border border-gold-500 text-gold-400" : "bg-surface-200 text-stone-600"}`}>
                    {i + 1 < step ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i + 1 === step ? "text-gold-400" : "text-stone-600"}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-colors ${i + 1 < step ? "bg-gold-500/40" : "bg-surface-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 py-5 max-h-96 overflow-y-auto">
          {step === 1 && (
            <div>
              <p className="text-stone-400 text-sm mb-3">Select your city in Nigeria</p>
              <input
                type="text"
                placeholder="Search city..."
                value={citySearch}
                onChange={e => setCitySearch(e.target.value)}
                className="w-full bg-surface-300 border border-white/8 rounded-xl px-4 py-2.5 text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-gold-500/40 mb-3"
              />
              <div className="grid grid-cols-2 gap-2">
                {filteredCities.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCity(c); setArea(""); setJunction(""); }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border ${city === c ? "bg-gold-500/15 border-gold-500/50 text-gold-300" : "bg-surface-300 border-white/5 text-stone-400 hover:border-white/15 hover:text-stone-200"}`}
                  >
                    <span className="block text-xs mb-0.5 opacity-60">{DELIVERY_DAYS[c]} business days</span>
                    {displayCity(c)}
                  </button>
                ))}
                {filteredCities.length === 0 && (
                  <p className="col-span-2 text-center text-stone-600 text-sm py-4">No city found</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-stone-400 text-sm mb-4">Which area in <span className="text-gold-400">{displayCity(city)}</span>?</p>
              <div className="grid grid-cols-2 gap-2">
                {areas.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setArea(a); setJunction(""); }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border ${area === a ? "bg-gold-500/15 border-gold-500/50 text-gold-300" : "bg-surface-300 border-white/5 text-stone-400 hover:border-white/15 hover:text-stone-200"}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-stone-400 text-sm mb-4">Choose your nearest drop-off junction in <span className="text-gold-400">{area}</span></p>
              <div className="space-y-2">
                {junctions.map((j) => (
                  <button
                    key={j}
                    onClick={() => setJunction(j)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border flex items-center gap-3 ${junction === j ? "bg-gold-500/15 border-gold-500/50 text-gold-300" : "bg-surface-300 border-white/5 text-stone-400 hover:border-white/15 hover:text-stone-200"}`}
                  >
                    <svg className={`w-4 h-4 flex-shrink-0 ${junction === j ? "text-gold-400" : "text-stone-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {j}
                  </button>
                ))}
              </div>

              {junction && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-white/8 bg-surface-300 h-32 flex items-center justify-center relative">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }} />
                  <div className="text-center z-10 relative">
                    <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-gold-500/40 animate-bounce">
                      <svg className="w-5 h-5 text-surface-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <p className="text-gold-400 text-xs font-semibold">{junction}</p>
                    <p className="text-stone-500 text-xs">{area}, {displayCity(city)}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-stone-400 text-sm mb-4">Your exact house address or description</p>
              <textarea
                value={houseAddress}
                onChange={(e) => setHouseAddress(e.target.value)}
                placeholder={`e.g. No. 5 Adeola Street, behind Access Bank, near ${junction}`}
                rows={3}
                className="w-full bg-surface-300 border border-white/8 rounded-xl px-4 py-3 text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-gold-500/40 resize-none"
              />

              <div className="mt-4 bg-surface-300 rounded-2xl border border-white/6 p-4">
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-3 font-medium">Delivery Summary</p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <svg className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <p className="text-stone-300 text-xs">Drop-off junction: <span className="text-gold-400 font-medium">{junction}</span></p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-stone-300 text-xs">Expected delivery: <span className="text-gold-400 font-medium">{getDeliveryDate(city)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-3 flex gap-3 border-t border-white/5">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl text-sm font-medium bg-surface-300 text-stone-400 hover:text-stone-200 border border-white/6 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={() => step < 4 ? setStep(step + 1) : handleFinish()}
            disabled={
              (step === 1 && !city) ||
              (step === 2 && !area) ||
              (step === 3 && !junction) ||
              (step === 4 && !houseAddress.trim())
            }
            className="flex-1 py-3 rounded-xl text-sm font-semibold btn-gold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {step === 4 ? "Proceed to Payment →" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
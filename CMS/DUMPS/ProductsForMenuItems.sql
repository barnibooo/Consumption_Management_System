INSERT INTO MenuItems (Name, Category, Price, Description, IsAvailable, ImagePath)
VALUES
-- Levesek
('Húsleves gazdagon', 'Leves', 2500, 'Kiadós, klasszikus húsleves marhahússal, zöldségekkel és házi csigatésztával.', 1, '/img/orders/husleves.png'),
('Gulyásleves', 'Leves', 2600, 'Magyaros ízvilágú, fűszeres marhahúsleves burgonyával és zöldségekkel.', 1, '/img/orders/gulyasleves.png'),
('Brokkolikrémleves', 'Leves', 2100, 'Selymes, egészséges leves pirított sajtos kenyérkockákkal.', 0, '/img/orders/brokkolikremleves.png'),
('Thai kókusztejes csirkeleves', 'Leves', 2700, 'Kellemesen csípős, egzotikus leves lime-mal, korianderrel és csirkehússal.', 1, '/img/orders/thaileves.png'),

-- Előételek
('Bruschetta', 'Előétel', 1600, 'Ropogós pirítós friss paradicsommal, olívaolajjal és bazsalikommal.', 1, '/img/orders/bruschetta.png'),
('Füstölt lazactekercs', 'Előétel', 2400, 'Kapros krémsajttal töltött, elegáns előétel friss zöldekkel.', 0, '/img/orders/fustolt_lazactekercs.png'),
('Görög saláta', 'Előétel', 2200, 'Friss zöldségek, feta sajt és olívabogyó mediterrán hangulatban.', 1, '/img/orders/gorogsalata.png'),
('Mini csirkeszárnyak BBQ szósszal', 'Előétel', 2100, 'Ropogósra sült csirkeszárnyak füstös, édes BBQ mártással.', 1, '/img/orders/csirkeszarny.png'),

-- Főételek
('Grillezett lazac citromos vajjal', 'Főétel', 3900, 'Könnyű, egészséges fogás friss zöldségekkel és citromos ízvilággal.', 1, '/img/orders/grilllazac.png'),
('Rántott sertésborda', 'Főétel', 3400, 'Klasszikus, bőséges adag petrezselymes burgonyával és savanyúsággal.', 1, '/img/orders/sertesborda.png'),
('Vega tésztasaláta', 'Főétel', 2900, 'Színes, friss tésztasaláta szezonális zöldségekkel és fűszeres öntettel.', 0, '/img/orders/tesztasalata.png'),
('Marhapörkölt galuskával', 'Főétel', 3700, 'Sűrű szaftos marhapörkölt, házi galuskával tálalva.', 1, '/img/orders/marhaporkolt.png'),

-- Desszertek
('Palacsinta', 'Desszert', 1600, 'Két darab vékony palacsinta választható töltelékkel (lekvár, túró, Nutella).', 1, '/img/orders/palacsinta.png'),
('Csokoládéláva tortácska', 'Desszert', 2200, 'Ropogós külső, olvadt csokoládé belül – vaníliafagylalttal.', 1, '/img/orders/lavatorta.png'),
('Tiramisu pohárkrém', 'Desszert', 1800, 'Kávéval átitatott babapiskóta, mascarpone krém és kakaópor.', 1, '/img/orders/tiramisu.png'),
('Gyümölcstál', 'Desszert', 1500, 'Friss, szezonális gyümölcsök látványos tálalásban.', 1, '/img/orders/gyumolcstal.png'),

-- Hamburgerek
('Classic burger', 'Hamburger', 3200, 'Szaftos marhahúspogácsa, cheddar, paradicsom és ropogós saláta.', 1, '/img/orders/classicburger.png'),
('Csirkeburger', 'Hamburger', 3000, 'Grillezett csirkemell BBQ szósszal, friss zöldségekkel, puha buciban.', 1, '/img/orders/csirkeburger.png'),
('Deluxe bacon burger', 'Hamburger', 3600, 'Dupla hús, ropogós bacon, füstölt sajt – igazi ízorgia.', 0, '/img/orders/baconburger.png'),
('Chili burger', 'Hamburger', 3300, 'Csípős élmény jalapeñóval, chili szósszal és lilahagymával.', 1, '/img/orders/chiliburger.png'),

-- Pizzák
('Margarita', 'Pizza', 2800, 'Paradicsomszósz, mozzarella, friss bazsalikom – a legegyszerűbb tökéletesség.', 1, '/img/orders/margarita.png'),
('Sonkás-gombás', 'Pizza', 3100, 'Selymes sonka és friss gomba gazdag feltéttel, sajttal.', 1, '/img/orders/songopizza.png'),
('Hawaii', 'Pizza', 3000, 'Sonka és ananász pikáns kombinációja.', 0, '/img/orders/hawaiipizza.png'),
('Vega pizza', 'Pizza', 2900, 'Paprika, hagyma, kukorica, olíva – húsmentesen is laktató.', 1, '/img/orders/vegapizza.png'),

-- Italok
('Limonádé', 'Ital', 1200, 'Házi készítésű limonádé friss citrommal – kérhető epres vagy mentás változatban is.', 1, '/img/orders/limonade.png'),
('Házi jeges tea', 'Ital', 1000, 'Barack vagy citrom ízesítésű hűsítő tea, jéggel.', 1, '/img/orders/icetea.png'),
('Ásványvíz', 'Ital', 700, 'Mentes vagy buborékos – frissítő szomjoltó.', 1, '/img/orders/asvanyviz.png'),
('Frissen facsart narancslé', 'Ital', 1500, '100% természetes, édes narancslé közvetlenül a gyümölcsből.', 1, '/img/orders/narancsle.png'),

-- Kávék
('Cappuccino', 'Kávé', 900, 'Krémes tejhab, lágy ízvilág, klasszikus kávéélmény.', 1, '/img/orders/cappuccino.png'),
('Latte macchiato', 'Kávé', 1000, 'Tejhab és kávé rétegei – finoman kiegyensúlyozva.', 1, '/img/orders/latte.png'),
('Jeges kávé', 'Kávé', 1100, 'Hideg kávéélmény, vaníliafagylalttal és tejszínhabbal.', 1, '/img/orders/jegeskave.png'),
('Ízesített kávé', 'Kávé', 950, 'Választható mogyoró, karamell vagy vanília sziruppal.', 0, '/img/orders/izesitettkave.png');


const dogBreeds = { mixed: { name: "Mixed Breed", lifespan: 13, size: "medium", img: "/images/dog-header.png" }, labrador: { name: "Labrador Retriever", lifespan: 12, size: "large", img: "/images/dog-header.png" }, german_shepherd: { name: "German Shepherd", lifespan: 11, size: "large", img: "/images/dog-header.png" }, golden_retriever: { name: "Golden Retriever", lifespan: 12, size: "large", img: "/images/dog-header.png" }, bulldog: { name: "Bulldog", lifespan: 8, size: "medium", img: "/images/dog-header.png" }, beagle: { name: "Beagle", lifespan: 13, size: "medium", img: "/images/dog-header.png" }, poodle: { name: "Poodle", lifespan: 14, size: "medium", img: "/images/dog-header.png" }, rottweiler: { name: "Rottweiler", lifespan: 10, size: "large", img: "/images/dog-header.png" }, yorkshire_terrier: { name: "Yorkshire Terrier", lifespan: 15, size: "small", img: "/images/dog-header.png" }, boxer: { name: "Boxer", lifespan: 11, size: "large", img: "/images/dog-header.png" }, dachshund: { name: "Dachshund", lifespan: 13, size: "small", img: "/images/dog-header.png" }, siberian_husky: { name: "Siberian Husky", lifespan: 13, size: "large", img: "/images/dog-header.png" }, doberman: { name: "Doberman Pinscher", lifespan: 11, size: "large", img: "/images/dog-header.png" }, great_dane: { name: "Great Dane", lifespan: 8, size: "giant", img: "/images/dog-header.png" }, shih_tzu: { name: "Shih Tzu", lifespan: 14, size: "small", img: "/images/dog-header.png" }, chihuahua: { name: "Chihuahua", lifespan: 16, size: "small", img: "/images/dog-header.png" }, pomeranian: { name: "Pomeranian", lifespan: 14, size: "small", img: "/images/dog-header.png" }, border_collie: { name: "Border Collie", lifespan: 13, size: "medium", img: "/images/dog-header.png" }, australian_shepherd: { name: "Australian Shepherd", lifespan: 13, size: "medium", img: "/images/dog-header.png" }, cocker_spaniel: { name: "Cocker Spaniel", lifespan: 12, size: "medium", img: "/images/dog-header.png" }, shetland_sheepdog: { name: "Shetland Sheepdog", lifespan: 13, size: "small", img: "/images/dog-header.png" }, boston_terrier: { name: "Boston Terrier", lifespan: 12, size: "small", img: "/images/dog-header.png" }, havanese: { name: "Havanese", lifespan: 15, size: "small", img: "/images/dog-header.png" }, bernese_mountain: { name: "Bernese Mountain Dog", lifespan: 8, size: "giant", img: "/images/dog-header.png" }, miniature_schnauzer: { name: "Miniature Schnauzer", lifespan: 13, size: "small", img: "/images/dog-header.png" }, cavalier_king_charles: { name: "Cavalier King Charles Spaniel", lifespan: 11, size: "small", img: "/images/dog-header.png" }, shiba_inu: { name: "Shiba Inu", lifespan: 14, size: "medium", img: "/images/dog-header.png" }, english_mastiff: { name: "English Mastiff", lifespan: 7, size: "giant", img: "/images/dog-header.png" }, bichon_frise: { name: "Bichon Frise", lifespan: 15, size: "small", img: "/images/dog-header.png" }, maltese: { name: "Maltese", lifespan: 15, size: "small", img: "/images/dog-header.png" }, papillon: { name: "Papillon", lifespan: 15, size: "small", img: "/images/dog-header.png" }, french_bulldog: { name: "French Bulldog", lifespan: 11, size: "small", img: "/images/dog-header.png" }, pitbull: { name: "Pit Bull Terrier", lifespan: 12, size: "medium", img: "/images/dog-header.png" }, corgi: { name: "Pembroke Welsh Corgi", lifespan: 13, size: "small", img: "/images/dog-header.png" }, newfoundland: { name: "Newfoundland", lifespan: 9, size: "giant", img: "/images/dog-header.png" }, saint_bernard: { name: "Saint Bernard", lifespan: 9, size: "giant", img: "/images/dog-header.png" }, weimaraner: { name: "Weimaraner", lifespan: 11, size: "large", img: "/images/dog-header.png" }, collie: { name: "Collie", lifespan: 12, size: "large", img: "/images/dog-header.png" }, basset_hound: { name: "Basset Hound", lifespan: 12, size: "medium", img: "/images/dog-header.png" }, akita: { name: "Akita", lifespan: 11, size: "large", img: "/images/dog-header.png" }, bloodhound: { name: "Bloodhound", lifespan: 10, size: "large", img: "/images/dog-header.png" }, whippet: { name: "Whippet", lifespan: 13, size: "medium", img: "/images/dog-header.png" }, rhodesian_ridgeback: { name: "Rhodesian Ridgeback", lifespan: 11, size: "large", img: "/images/dog-header.png" }, dalmatian: { name: "Dalmatian", lifespan: 12, size: "large", img: "/images/dog-header.png" }, samoyed: { name: "Samoyed", lifespan: 13, size: "large", img: "/images/dog-header.png" }, pug: { name: "Pug", lifespan: 13, size: "small", img: "/images/dog-header.png" }, english_springer: { name: "English Springer Spaniel", lifespan: 12, size: "medium", img: "/images/dog-header.png" }, vizsla: { name: "Vizsla", lifespan: 13, size: "large", img: "/images/dog-header.png" }, cane_corso: { name: "Cane Corso", lifespan: 10, size: "giant", img: "/images/dog-header.png" }, malamute: { name: "Alaskan Malamute", lifespan: 12, size: "giant", img: "/images/dog-header.png" } };

const catBreeds = { mixed: { name: "Mixed Breed / Domestic", lifespan: 15, size: "medium", img: "/images/cat-header.png" }, persian: { name: "Persian", lifespan: 14, size: "medium", img: "/images/cat-header.png" }, maine_coon: { name: "Maine Coon", lifespan: 13, size: "large", img: "/images/cat-header.png" }, siamese: { name: "Siamese", lifespan: 15, size: "medium", img: "/images/cat-header.png" }, ragdoll: { name: "Ragdoll", lifespan: 15, size: "large", img: "/images/cat-header.png" }, bengal: { name: "Bengal", lifespan: 14, size: "medium", img: "/images/cat-header.png" }, sphynx: { name: "Sphynx", lifespan: 13, size: "medium", img: "/images/cat-header.png" }, british_shorthair: { name: "British Shorthair", lifespan: 14, size: "medium", img: "/images/cat-header.png" }, scottish_fold: { name: "Scottish Fold", lifespan: 14, size: "medium", img: "/images/cat-header.png" }, abyssinian: { name: "Abyssinian", lifespan: 14, size: "medium", img: "/images/cat-header.png" }, russian_blue: { name: "Russian Blue", lifespan: 15, size: "medium", img: "/images/cat-header.png" }, norwegian_forest: { name: "Norwegian Forest", lifespan: 14, size: "large", img: "/images/cat-header.png" }, birman: { name: "Birman", lifespan: 15, size: "medium", img: "/images/cat-header.png" }, oriental_shorthair: { name: "Oriental Shorthair", lifespan: 15, size: "medium", img: "/images/cat-header.png" }, devon_rex: { name: "Devon Rex", lifespan: 13, size: "medium", img: "/images/cat-header.png" }, cornish_rex: { name: "Cornish Rex", lifespan: 13, size: "medium", img: "/images/cat-header.png" }, siberian: { name: "Siberian", lifespan: 15, size: "large", img: "/images/cat-header.png" }, turkish_angora: { name: "Turkish Angora", lifespan: 15, size: "medium", img: "/images/cat-header.png" }, american_shorthair: { name: "American Shorthair", lifespan: 16, size: "medium", img: "/images/cat-header.png" }, exotic_shorthair: { name: "Exotic Shorthair", lifespan: 14, size: "medium", img: "/images/cat-header.png" } };

const cowBreeds = { mixed: { name: "Mixed Breed", lifespan: 18, size: "medium", img: "/images/cow-header.png" }, holstein: { name: "Holstein", lifespan: 6, size: "large", img: "/images/cow-header.png" }, jersey: { name: "Jersey", lifespan: 12, size: "medium", img: "/images/cow-header.png" }, angus: { name: "Angus", lifespan: 12, size: "large", img: "/images/cow-header.png" }, hereford: { name: "Hereford", lifespan: 12, size: "large", img: "/images/cow-header.png" }, guernsey: { name: "Guernsey", lifespan: 13, size: "medium", img: "/images/cow-header.png" }, brown_swiss: { name: "Brown Swiss", lifespan: 14, size: "large", img: "/images/cow-header.png" }, brahman: { name: "Brahman", lifespan: 15, size: "large", img: "/images/cow-header.png" }, highland: { name: "Scottish Highland", lifespan: 15, size: "medium", img: "/images/cow-header.png" }, dexter: { name: "Dexter", lifespan: 17, size: "small", img: "/images/cow-header.png" }, ayrshire: { name: "Ayrshire", lifespan: 12, size: "medium", img: "/images/cow-header.png" }, red_poll: { name: "Red Poll", lifespan: 14, size: "medium", img: "/images/cow-header.png" }, galloway: { name: "Galloway", lifespan: 15, size: "medium", img: "/images/cow-header.png" }, simmental: { name: "Simmental", lifespan: 11, size: "large", img: "/images/cow-header.png" }, charolais: { name: "Charolais", lifespan: 11, size: "large", img: "/images/cow-header.png" }, limousin: { name: "Limousin", lifespan: 12, size: "large", img: "/images/cow-header.png" }, wagyu: { name: "Wagyu", lifespan: 12, size: "medium", img: "/images/cow-header.png" } };

const rabbitBreeds = { mixed: { name: "Mixed Breed", lifespan: 10, size: "medium", img: "/images/rabbit-header.png" }, holland_lop: { name: "Holland Lop", lifespan: 10, size: "small", img: "/images/rabbit-header.png" }, mini_lop: { name: "Mini Lop", lifespan: 10, size: "small", img: "/images/rabbit-header.png" }, netherland_dwarf: { name: "Netherland Dwarf", lifespan: 12, size: "small", img: "/images/rabbit-header.png" }, lionhead: { name: "Lionhead", lifespan: 10, size: "small", img: "/images/rabbit-header.png" }, rex: { name: "Rex", lifespan: 8, size: "medium", img: "/images/rabbit-header.png" }, flemish_giant: { name: "Flemish Giant", lifespan: 8, size: "giant", img: "/images/rabbit-header.png" }, english_angora: { name: "English Angora", lifespan: 10, size: "medium", img: "/images/rabbit-header.png" }, dutch: { name: "Dutch", lifespan: 10, size: "medium", img: "/images/rabbit-header.png" }, californian: { name: "Californian", lifespan: 8, size: "large", img: "/images/rabbit-header.png" }, mini_rex: { name: "Mini Rex", lifespan: 10, size: "small", img: "/images/rabbit-header.png" }, polish: { name: "Polish", lifespan: 10, size: "small", img: "/images/rabbit-header.png" }, havana: { name: "Havana", lifespan: 9, size: "medium", img: "/images/rabbit-header.png" }, satin: { name: "Satin", lifespan: 9, size: "medium", img: "/images/rabbit-header.png" }, chinchilla: { name: "Chinchilla Rabbit", lifespan: 9, size: "medium", img: "/images/rabbit-header.png" }, new_zealand: { name: "New Zealand", lifespan: 8, size: "large", img: "/images/rabbit-header.png" }, english_spot: { name: "English Spot", lifespan: 9, size: "medium", img: "/images/rabbit-header.png" }, harlequin: { name: "Harlequin", lifespan: 9, size: "medium", img: "/images/rabbit-header.png" } };

const parrotBreeds = { mixed: { name: "Mixed / Other", lifespan: 20, size: "medium", img: "/images/parrot-header.png" }, african_grey: { name: "African Grey", lifespan: 50, size: "medium", img: "/images/parrot-header.png" }, macaw: { name: "Macaw", lifespan: 60, size: "large", img: "/images/parrot-header.png" }, cockatoo: { name: "Cockatoo", lifespan: 50, size: "medium", img: "/images/parrot-header.png" }, amazon: { name: "Amazon Parrot", lifespan: 55, size: "medium", img: "/images/parrot-header.png" }, budgie: { name: "Budgerigar (Budgie)", lifespan: 8, size: "small", img: "/images/parrot-header.png" }, cockatiel: { name: "Cockatiel", lifespan: 15, size: "small", img: "/images/parrot-header.png" }, lovebird: { name: "Lovebird", lifespan: 12, size: "small", img: "/images/parrot-header.png" }, eclectus: { name: "Eclectus", lifespan: 30, size: "medium", img: "/images/parrot-header.png" }, conure: { name: "Conure", lifespan: 20, size: "small", img: "/images/parrot-header.png" }, lorikeet: { name: "Lorikeet", lifespan: 15, size: "small", img: "/images/parrot-header.png" }, ringneck: { name: "Indian Ringneck", lifespan: 25, size: "small", img: "/images/parrot-header.png" }, quaker: { name: "Quaker Parrot", lifespan: 20, size: "small", img: "/images/parrot-header.png" }, caique: { name: "Caique", lifespan: 25, size: "small", img: "/images/parrot-header.png" }, pionus: { name: "Pionus", lifespan: 25, size: "small", img: "/images/parrot-header.png" }, senegal: { name: "Senegal Parrot", lifespan: 30, size: "small", img: "/images/parrot-header.png" }, alexandrine: { name: "Alexandrine Parakeet", lifespan: 30, size: "medium", img: "/images/parrot-header.png" }, derbyan: { name: "Derbyan Parakeet", lifespan: 25, size: "medium", img: "/images/parrot-header.png" }, hawk_headed: { name: "Hawk-Headed Parrot", lifespan: 30, size: "medium", img: "/images/parrot-header.png" }, rainbow_lorikeet: { name: "Rainbow Lorikeet", lifespan: 15, size: "small", img: "/images/parrot-header.png" } };

const horseBreeds = { mixed: { name: "Mixed Breed", lifespan: 28, size: "medium", img: "/images/horse-header.png" }, arabian: { name: "Arabian", lifespan: 30, size: "medium", img: "/images/horse-header.png" }, thoroughbred: { name: "Thoroughbred", lifespan: 28, size: "large", img: "/images/horse-header.png" }, quarter_horse: { name: "Quarter Horse", lifespan: 28, size: "medium", img: "/images/horse-header.png" }, appaloosa: { name: "Appaloosa", lifespan: 30, size: "medium", img: "/images/horse-header.png" }, paint_horse: { name: "Paint Horse", lifespan: 28, size: "medium", img: "/images/horse-header.png" }, morgan: { name: "Morgan", lifespan: 30, size: "medium", img: "/images/horse-header.png" }, tennessee_walker: { name: "Tennessee Walking Horse", lifespan: 30, size: "medium", img: "/images/horse-header.png" }, andalusian: { name: "Andalusian", lifespan: 25, size: "medium", img: "/images/horse-header.png" }, warmblood: { name: "Warmblood", lifespan: 28, size: "large", img: "/images/horse-header.png" }, friesian: { name: "Friesian", lifespan: 16, size: "large", img: "/images/horse-header.png" }, mustang: { name: "Mustang", lifespan: 30, size: "medium", img: "/images/horse-header.png" }, akhal_teke: { name: "Akhal-Teke", lifespan: 28, size: "medium", img: "/images/horse-header.png" }, clydesdale: { name: "Clydesdale", lifespan: 20, size: "giant", img: "/images/horse-header.png" }, percheron: { name: "Percheron", lifespan: 25, size: "giant", img: "/images/horse-header.png" }, belgian: { name: "Belgian", lifespan: 20, size: "giant", img: "/images/horse-header.png" }, shire: { name: "Shire", lifespan: 20, size: "giant", img: "/images/horse-header.png" }, icelandic: { name: "Icelandic Horse", lifespan: 30, size: "small", img: "/images/horse-header.png" }, haflinger: { name: "Haflinger", lifespan: 30, size: "small", img: "/images/horse-header.png" }, welsh_pony: { name: "Welsh Pony", lifespan: 30, size: "small", img: "/images/horse-header.png" }, shetland_pony: { name: "Shetland Pony", lifespan: 30, size: "small", img: "/images/horse-header.png" }, miniature_horse: { name: "Miniature Horse", lifespan: 32, size: "small", img: "/images/horse-header.png" } };

let currentPetType = 'dog';
let currentBreedData = { ...dogBreeds };


const PET_TAB_ORDER = ['dog', 'cat', 'cow', 'horse', 'rabbit', 'parrot'];

function showTable(type) {
  document.querySelectorAll('.pet-table-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.table-tab').forEach(t => t.classList.remove('active'));
  const section = document.getElementById('table-' + type);
  if (section) section.classList.add('active');
  // Match the tab button by its position instead of relying on the global
  // `event` object (the HTML calls showTable('dog') with no event argument,
  // and bare `event` inside a plain <script> is a non-standard/legacy
  // browser fallback, not something to depend on).
  const tabs = document.querySelectorAll('.table-tab');
  const idx = PET_TAB_ORDER.indexOf(type);
  if (idx !== -1 && tabs[idx]) tabs[idx].classList.add('active');
}

function selectPetType(type) {
  currentPetType = type;
  ['dog','cat','cow','horse','rabbit','parrot'].forEach(t => {
    document.getElementById('btn-' + t).classList.toggle('active', t === type);
  });
  const breedSelect = document.getElementById('breed');
  document.getElementById('size-group').style.display = 'none';
  document.getElementById('cat-size-group').style.display = 'none';
  document.getElementById('cow-size-group').style.display = 'none';
  document.getElementById('horse-size-group').style.display = 'none';
  document.getElementById('rabbit-size-group').style.display = 'none';
  document.getElementById('parrot-size-group').style.display = 'none';

  let optionsHTML = '';
  if (type === 'cat') {
    currentBreedData = { ...catBreeds };
    document.getElementById('cat-size-group').style.display = 'block';
    optionsHTML = `<option value="mixed">Mixed Breed / Domestic</option>
<option value="persian">Persian</option>
<option value="maine_coon">Maine Coon</option>
<option value="siamese">Siamese</option>
<option value="ragdoll">Ragdoll</option>
<option value="bengal">Bengal</option>
<option value="sphynx">Sphynx</option>
<option value="british_shorthair">British Shorthair</option>
<option value="scottish_fold">Scottish Fold</option>
<option value="abyssinian">Abyssinian</option>
<option value="russian_blue">Russian Blue</option>
<option value="norwegian_forest">Norwegian Forest</option>
<option value="birman">Birman</option>
<option value="oriental_shorthair">Oriental Shorthair</option>
<option value="devon_rex">Devon Rex</option>
<option value="cornish_rex">Cornish Rex</option>
<option value="siberian">Siberian</option>
<option value="turkish_angora">Turkish Angora</option>
<option value="american_shorthair">American Shorthair</option>
<option value="exotic_shorthair">Exotic Shorthair</option>`;
  } else if (type === 'cow') {
    currentBreedData = { ...cowBreeds };
    document.getElementById('cow-size-group').style.display = 'block';
    optionsHTML = `<option value="mixed">Mixed Breed / Other</option>
<option value="holstein">Holstein</option>
<option value="jersey">Jersey</option>
<option value="angus">Angus</option>
<option value="hereford">Hereford</option>
<option value="guernsey">Guernsey</option>
<option value="brown_swiss">Brown Swiss</option>
<option value="brahman">Brahman</option>
<option value="highland">Scottish Highland</option>
<option value="dexter">Dexter</option>
<option value="ayrshire">Ayrshire</option>
<option value="red_poll">Red Poll</option>
<option value="galloway">Galloway</option>
<option value="simmental">Simmental</option>
<option value="charolais">Charolais</option>
<option value="limousin">Limousin</option>
<option value="wagyu">Wagyu</option>`;
  } else if (type === 'horse') {
    currentBreedData = { ...horseBreeds };
    document.getElementById('horse-size-group').style.display = 'block';
    optionsHTML = `<option value="mixed">Mixed Breed / Other</option>
<option value="arabian">Arabian</option>
<option value="thoroughbred">Thoroughbred</option>
<option value="quarter_horse">Quarter Horse</option>
<option value="appaloosa">Appaloosa</option>
<option value="paint_horse">Paint Horse</option>
<option value="morgan">Morgan</option>
<option value="tennessee_walker">Tennessee Walking Horse</option>
<option value="andalusian">Andalusian</option>
<option value="warmblood">Warmblood</option>
<option value="friesian">Friesian</option>
<option value="mustang">Mustang</option>
<option value="akhal_teke">Akhal-Teke</option>
<option value="clydesdale">Clydesdale</option>
<option value="percheron">Percheron</option>
<option value="belgian">Belgian</option>
<option value="shire">Shire</option>
<option value="icelandic">Icelandic Horse</option>
<option value="haflinger">Haflinger</option>
<option value="welsh_pony">Welsh Pony</option>
<option value="shetland_pony">Shetland Pony</option>
<option value="miniature_horse">Miniature Horse</option>`;
  } else if (type === 'rabbit') {
    currentBreedData = { ...rabbitBreeds };
    document.getElementById('rabbit-size-group').style.display = 'block';
    optionsHTML = `<option value="mixed">Mixed Breed / Other</option>
<option value="holland_lop">Holland Lop</option>
<option value="mini_lop">Mini Lop</option>
<option value="netherland_dwarf">Netherland Dwarf</option>
<option value="lionhead">Lionhead</option>
<option value="rex">Rex</option>
<option value="flemish_giant">Flemish Giant</option>
<option value="english_angora">English Angora</option>
<option value="dutch">Dutch</option>
<option value="californian">Californian</option>
<option value="mini_rex">Mini Rex</option>
<option value="polish">Polish</option>
<option value="havana">Havana</option>
<option value="satin">Satin</option>
<option value="chinchilla">Chinchilla Rabbit</option>
<option value="new_zealand">New Zealand</option>
<option value="english_spot">English Spot</option>
<option value="harlequin">Harlequin</option>`;
  } else if (type === 'parrot') {
    currentBreedData = { ...parrotBreeds };
    document.getElementById('parrot-size-group').style.display = 'block';
    optionsHTML = `<option value="mixed">Mixed / Other</option>
<option value="african_grey">African Grey</option>
<option value="macaw">Macaw</option>
<option value="cockatoo">Cockatoo</option>
<option value="amazon">Amazon Parrot</option>
<option value="budgie">Budgerigar (Budgie)</option>
<option value="cockatiel">Cockatiel</option>
<option value="lovebird">Lovebird</option>
<option value="eclectus">Eclectus</option>
<option value="conure">Conure</option>
<option value="lorikeet">Lorikeet</option>
<option value="ringneck">Indian Ringneck</option>
<option value="quaker">Quaker Parrot</option>
<option value="caique">Caique</option>
<option value="pionus">Pionus</option>
<option value="senegal">Senegal Parrot</option>
<option value="alexandrine">Alexandrine Parakeet</option>
<option value="derbyan">Derbyan Parakeet</option>
<option value="hawk_headed">Hawk-Headed Parrot</option>
<option value="rainbow_lorikeet">Rainbow Lorikeet</option>`;
  } else {
    currentBreedData = { ...dogBreeds };
    document.getElementById('size-group').style.display = 'block';
    optionsHTML = `<option value="mixed">Mixed Breed / Other</option>
<option value="labrador">Labrador Retriever</option>
<option value="german_shepherd">German Shepherd</option>
<option value="golden_retriever">Golden Retriever</option>
<option value="bulldog">Bulldog</option>
<option value="beagle">Beagle</option>
<option value="poodle">Poodle</option>
<option value="rottweiler">Rottweiler</option>
<option value="yorkshire_terrier">Yorkshire Terrier</option>
<option value="boxer">Boxer</option>
<option value="dachshund">Dachshund</option>
<option value="siberian_husky">Siberian Husky</option>
<option value="doberman">Doberman Pinscher</option>
<option value="great_dane">Great Dane</option>
<option value="shih_tzu">Shih Tzu</option>
<option value="chihuahua">Chihuahua</option>
<option value="pomeranian">Pomeranian</option>
<option value="border_collie">Border Collie</option>
<option value="australian_shepherd">Australian Shepherd</option>
<option value="cocker_spaniel">Cocker Spaniel</option>
<option value="shetland_sheepdog">Shetland Sheepdog</option>
<option value="boston_terrier">Boston Terrier</option>
<option value="havanese">Havanese</option>
<option value="bernese_mountain">Bernese Mountain Dog</option>
<option value="miniature_schnauzer">Miniature Schnauzer</option>
<option value="cavalier_king_charles">Cavalier King Charles Spaniel</option>
<option value="shiba_inu">Shiba Inu</option>
<option value="english_mastiff">English Mastiff</option>
<option value="bichon_frise">Bichon Frise</option>
<option value="maltese">Maltese</option>
<option value="papillon">Papillon</option>
<option value="french_bulldog">French Bulldog</option>
<option value="pitbull">Pit Bull Terrier</option>
<option value="corgi">Pembroke Welsh Corgi</option>
<option value="newfoundland">Newfoundland</option>
<option value="saint_bernard">Saint Bernard</option>
<option value="weimaraner">Weimaraner</option>
<option value="collie">Collie</option>
<option value="basset_hound">Basset Hound</option>
<option value="akita">Akita</option>
<option value="bloodhound">Bloodhound</option>
<option value="whippet">Whippet</option>
<option value="rhodesian_ridgeback">Rhodesian Ridgeback</option>
<option value="dalmatian">Dalmatian</option>
<option value="samoyed">Samoyed</option>
<option value="pug">Pug</option>
<option value="english_springer">English Springer Spaniel</option>
<option value="vizsla">Vizsla</option>
<option value="cane_corso">Cane Corso</option>
<option value="malamute">Alaskan Malamute</option>`;
  }
  breedSelect.innerHTML = optionsHTML;
  document.getElementById('result').classList.remove('show');
}


function getAverageLifespanForSize(breedData, size) {
  // Estimate a mixed-breed pet's lifespan from the known breeds of the same
  // size in this species, instead of always using the fixed "mixed" value.
  const matches = Object.values(breedData).filter(b => b.size === size && b.name.indexOf('Mixed') === -1);
  if (matches.length === 0) return null;
  const total = matches.reduce((sum, b) => sum + b.lifespan, 0);
  return total / matches.length;
}

function calculateAge() {
  const breed = document.getElementById('breed').value;
  const years = parseInt(document.getElementById('years').value) || 0;
  const months = parseInt(document.getElementById('months').value) || 0;
  if (years === 0 && months === 0) { alert("Please enter your pet's age!"); return; }
  const totalPetAge = years + (months / 12);
  const breedInfo = currentBreedData[breed] || currentBreedData.mixed;
  let size = breedInfo.size;
  let effectiveLifespan = breedInfo.lifespan;
  if (breed === 'mixed') {
    if (currentPetType === 'cat') size = document.getElementById('cat-size').value;
    else if (currentPetType === 'cow') size = document.getElementById('cow-size').value;
    else if (currentPetType === 'horse') size = document.getElementById('horse-size').value;
    else if (currentPetType === 'rabbit') size = document.getElementById('rabbit-size').value;
    else if (currentPetType === 'parrot') size = document.getElementById('parrot-size').value;
    else size = document.getElementById('size').value;
    const sizeBasedLifespan = getAverageLifespanForSize(currentBreedData, size);
    if (sizeBasedLifespan) effectiveLifespan = sizeBasedLifespan;
  }

  let humanAge;
  if (totalPetAge <= 1) { humanAge = totalPetAge * 15; }
  else if (totalPetAge <= 2) { humanAge = 15 + (totalPetAge - 1) * 9; }
  else {
    const lifespan = effectiveLifespan;
    const remainingYears = lifespan - 2;
    const humanYearsRemaining = 68 - 24;
    const ratePerYear = humanYearsRemaining / remainingYears;
    humanAge = 24 + (totalPetAge - 2) * ratePerYear;
  }

  const finalAge = Math.round(humanAge);
  let lifeStage, lifeStageClass;

  if (finalAge < 15) { 
    lifeStage = 'Baby'; 
    lifeStageClass = 'stage-puppy'; 
  }
  else if (finalAge < 24) { 
    lifeStage = 'Young Adult'; 
    lifeStageClass = 'stage-young'; 
  }
  else if (finalAge < 50) { 
    lifeStage = 'Adult'; 
    lifeStageClass = 'stage-adult'; 
  }
  else if (finalAge < 65) { 
    lifeStage = 'Senior'; 
    lifeStageClass = 'stage-senior'; 
  }
  else { 
    lifeStage = 'Geriatric'; 
    lifeStageClass = 'stage-geriatric'; 
  }

  const petNames = { dog: 'Dog', cat: 'Cat', cow: 'Cow', horse: 'Horse', rabbit: 'Rabbit', parrot: 'Parrot' };
  const petName = petNames[currentPetType] || 'Pet';
  const isMixed = (currentPetType === 'cat' && breedInfo.name === 'Mixed Breed / Domestic') || 
                  (currentPetType !== 'cat' && breedInfo.name === 'Mixed Breed');

  document.getElementById('result-pet-img').src = breedInfo.img;
  document.getElementById('result-pet-img').alt = breedInfo.name;
  document.getElementById('result-pet-title').textContent = (isMixed ? '' : breedInfo.name + ' ') + petName + ' Age Result';
  document.getElementById('result-age').textContent = finalAge;
  document.getElementById('life-stage').textContent = lifeStage;
  document.getElementById('life-stage').className = 'life-stage-badge ' + lifeStageClass;
  document.getElementById('pet-age-display').textContent = years + 'y ' + months + 'm';
  document.getElementById('breed-display').textContent = breedInfo.name;
  document.getElementById('lifespan-display').textContent = Math.round(effectiveLifespan) + ' yrs';
  document.getElementById('share-preview-img').src = breedInfo.img;
  document.getElementById('share-preview-text').textContent = `My ${breedInfo.name} ${petName} is ${finalAge} years old in human years! ${lifeStage} life stage.`;

  const shareText = `My ${breedInfo.name} ${petName} is ${finalAge} years old in human years! Calculate your pet's age at PetAgeCalc.in`;
  const shareUrl = encodeURIComponent(window.location.href);
  document.getElementById('share-x').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`;
  document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  document.getElementById('share-whatsapp').href = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`;
  document.getElementById('share-pinterest').href = `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${encodeURIComponent(shareText)}`;
  window.lastShareText = shareText;
  document.getElementById('result').classList.add('show');
  setTimeout(() => { document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
}


function shareInstagram() {
  const text = window.lastShareText || 'Check out my pet age in human years!';
  navigator.clipboard.writeText(text + ' ' + window.location.href).then(() => {
    showToast('Caption copied! Opening Instagram to paste it');
  }).catch(() => {
    showToast('Opening Instagram - paste your result there!');
  });
  setTimeout(() => { window.open('https://www.instagram.com/', '_blank'); }, 600);
}


function copyResult() {
  const breed = document.getElementById('breed-display').textContent;
  const age = document.getElementById('result-age').textContent;
  const petType = currentPetType;
  const petNames = { dog: 'dog', cat: 'cat', cow: 'cow', horse: 'horse', rabbit: 'rabbit', parrot: 'parrot' };
  const text = `My ${breed} is ${age} years old in human years! Calculate your ${petNames[petType] || 'pet'}'s age at PetAgeCalc.in`;
  navigator.clipboard.writeText(text).then(() => { showToast('Result copied to clipboard!'); }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Result copied to clipboard!');
  });
}


document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && document.getElementById('page-home').style.display !== 'none') { calculateAge(); }
});


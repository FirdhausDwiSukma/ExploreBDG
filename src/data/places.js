// Import wisata images (Optimized)
import tangkubanPerahu from '../assets/images/optimized/wisata/tangkuban-perahu.jpg'
import kawahPutih from '../assets/images/optimized/wisata/kawah-putih.jpg'
import farmHouse from '../assets/images/optimized/wisata/farm-house.jpg'
import floatingMarket from '../assets/images/optimized/wisata/floating-market.jpg'
import tebingKeraton from '../assets/images/optimized/wisata/tebing-keraton.jpg'
import dusunBambu from '../assets/images/optimized/wisata/dusun-bambu.jpg'

// WebP Variants
import tangkubanPerahuWebp from '../assets/images/optimized/wisata/tangkuban-perahu.webp'
import kawahPutihWebp from '../assets/images/optimized/wisata/kawah-putih.webp'
import farmHouseWebp from '../assets/images/optimized/wisata/farm-house.webp'
import floatingMarketWebp from '../assets/images/optimized/wisata/floating-market.webp'
import tebingKeratonWebp from '../assets/images/optimized/wisata/tebing-keraton.webp'
import dusunBambuWebp from '../assets/images/optimized/wisata/dusun-bambu.webp'

const places = [
    {
        id: 1,
        name: "Tangkuban Perahu",
        location: "Lembang, Bandung Barat",
        rating: 4.5,
        image: tangkubanPerahu,
        imageWebp: tangkubanPerahuWebp,
        category: "wisata"
    },
    {
        id: 2,
        name: "Kawah Putih",
        location: "Ciwidey, Bandung Selatan",
        rating: 4.7,
        image: kawahPutih,
        imageWebp: kawahPutihWebp,
        category: "wisata"
    },
    {
        id: 3,
        name: "Farm House Lembang",
        location: "Lembang, Bandung Barat",
        rating: 4.3,
        image: farmHouse,
        imageWebp: farmHouseWebp,
        category: "wisata"
    },
    {
        id: 4,
        name: "Floating Market Lembang",
        location: "Lembang, Bandung Barat",
        rating: 4.4,
        image: floatingMarket,
        imageWebp: floatingMarketWebp,
        category: "wisata"
    },
    {
        id: 5,
        name: "Tebing Keraton",
        location: "Dago, Bandung",
        rating: 4.6,
        image: tebingKeraton,
        imageWebp: tebingKeratonWebp,
        category: "wisata"
    },
    {
        id: 6,
        name: "Dusun Bambu",
        location: "Cisarua, Bandung Barat",
        rating: 4.5,
        image: dusunBambu,
        imageWebp: dusunBambuWebp,
        category: "wisata"
    },
    {
        id: 7,
        name: "Orchid Forest Cikole",
        location: "Lembang, Bandung Barat",
        rating: 4.6,
        image: tangkubanPerahu, // Reusing image for demo
        imageWebp: tangkubanPerahuWebp,
        category: "wisata"
    },
    {
        id: 8,
        name: "The Great Asia Africa",
        location: "Lembang, Bandung Barat",
        rating: 4.4,
        image: farmHouse, // Reusing image for demo
        imageWebp: farmHouseWebp,
        category: "wisata"
    },
    {
        id: 9,
        name: "Ranca Upas",
        location: "Ciwidey, Bandung Selatan",
        rating: 4.7,
        image: kawahPutih, // Reusing image for demo
        imageWebp: kawahPutihWebp,
        category: "wisata"
    }
]

export default places
const mongoose = require('mongoose');
const listing=require("./model/listing.js")


main()
.then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonder_lust');
  }

let intitdata= [
  
    {
      "title": "Oceanfront Luxury Villa",
      "description": "Exclusive retreat with stunning views",
      "img": {
        "url": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D",
        "filename": "listingsimg"
      },
      "price": 2800,
      "location": "Goa",
      "country": "India"
    },
    {
      "title": "Mountain View Chalet",
      "description": "Cosy cabin with panoramic vistas",
      "img": {
        "url": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "filename": "listingsimg"
      },
      "price": 2000,
      "location": "Manali",
      "country": "India"
    },
    {
      "title": "Serenade by the River",
      "description": "Tranquil riverside escape",
      "img": {
        "url": "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 1500,
      "location": "Rishikesh",
      "country": "India"
    },
    {
      "title": "Luxury Urban Penthouse",
      "description": "Sophisticated city living at its best",
      "img": {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "filename": "listingsimg"
      },
      "price": 3500,
      "location": "Mumbai",
      "country": "India"
    },
    {
      "title": "Hilltop Hideaway",
      "description": "Secluded retreat amidst lush greenery",
      "img": {
        "url": "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 2200,
      "location": "Ooty",
      "country": "India"
    },
    {
      "title": "Rustic Lakeside Cabin",
      "description": "Quaint cottage overlooking the lake",
      "img": {
        "url": "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=1428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "filename": "listingsimg"
      },
      "price": 1700,
      "location": "Nainital",
      "country": "India"
    },
    {
      "title": "Chic Downtown Loft",
      "description": "Modern living in the heart of the city",
      "img": {
        "url": "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 1200,
      "location": "Delhi",
      "country": "India"
    },
    {
      "title": "Seaside Retreat",
      "description": "Relaxation by the shore",
      "img": {
        "url": "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "filename": "listingsimg"
      },
      "price": 1900,
      "location": "Pondicherry",
      "country": "India"
    },
    {
      "title": "Tranquil Forest Cabin",
      "description": "Escape to the wilderness",
      "img": {
        "url": "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 1600,
      "location": "Coorg",
      "country": "India"
    },
    {
      "title": "Modern City Apartment",
      "description": "Convenient urban living",
      "img": {
        "url": "https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 800,
      "location": "Bangalore",
      "country": "India"
    },
    {
      "title": "Riverside Cottage Haven",
      "description": "Peaceful sanctuary by the river",
      "img": {
        "url": "https://plus.unsplash.com/premium_photo-1661963657305-f52dcaeef418?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 2100,
      "location": "Haridwar",
      "country": "India"
    },
    {
      "title": "Luxurious Beachfront Villa",
      "description": "Exquisite coastal living",
      "img": {
        "url": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "filename": "listingsimg"
      },
      "price": 2500,
      "location": "Alibaug",
      "country": "India"
    },
    {
      "title": "Mountain Retreat",
      "description": "Escape to the serene mountainside",
      "img": {
        "url": "https://images.unsplash.com/photo-1430285561322-7808604715df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 2300,
      "location": "Kasol",
      "country": "India"
    },
    {
      "title": "Vintage Countryside Cottage",
      "description": "Charming rural getaway",
      "img": {
        "url": "https://images.unsplash.com/photo-1560026301-88340cf16be7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGhvdXNlfGVufDB8fDB8fHww",
        "filename": "listingsimg"
      },
      "price": 1400,
      "location": "Pune",
      "country": "India"
    },
    {
      "title": "Artistic Seaside Villa",
      "description": "Creative inspiration by the sea",
      "img": {
        "url": "https://media.istockphoto.com/id/1263902259/photo/beautiful-modern-home-with-various-materials-used-on-the-facade.webp?b=1&s=170667a&w=0&k=20&c=AL6AXKVbnJhJJr7fhngzarPKQs8IDF5G3lOPC_PwsnY=",
        "filename": "listingsimg"
      },
      "price": 2600,
      "location": "Varkala",
      "country": "India"
    }
   
]  

const intitdb=async ()=>{
    await listing.deleteMany({});//to empty the db
    //adding owner to each obj in the array using map function which returns a new array that array is saved in same array
    intitdata=intitdata.map((obj)=>({...obj,owner:'66001749152d063c6760fabd'}))    
    await listing.insertMany(intitdata);
    console.log("success");
} 

intitdb();


  
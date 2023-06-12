# Purpose: Seed the database with some pets to test the API

# Clear the database
Pet.destroy_all

# Create fido
fido = Pet.create(
  name: "Fido",
  species: "dog",
  age: 3,
  color: "brown",
  breed: "labrador",
  favorite_food: "steak",
  favorite_toy: "bone",
  description: "Steals Sausages and your soul",
  image_path: "/assets/images/fido.png"
)

# Create spot
spot = Pet.create(
  name: "Spot",
  species: "dog",
  age: 2,
  color: "black",
  breed: "labrador",
  favorite_food: "steak",
  favorite_toy: "ball",
  description: "Can you spot him ?",
  image_path: "/assets/images/spot.png"
)

# Create rover
rover = Pet.create(
  name: "Rover",
  species: "dog",
  age: 5,
  color: "white",
  breed: "labrador",
  favorite_food: "steak",
  favorite_toy: "rope",
  featured: true,
  description: "Hot diggedy Dog, woof woof",
  image_path: "/assets/images/rover.png"
)

# Create fluffy
fluffy = Pet.create(
  name: "Fluffy",
  species: "cat",
  age: 1,
  color: "white",
  breed: "persian",
  favorite_food: "fish",
  favorite_toy: "ball",
  description: "One mean Cat, dont get close",
  image_path: "/assets/images/fluffy.png"
)

# Create patches
patches = Pet.create(
  name: "Patches",
  species: "cat",
  age: 2,
  color: "black",
  breed: "siamese",
  favorite_food: "fish",
  favorite_toy: "string",
  featured: true,
  description: "One patch work Cat, yessss maaasssssterrr !!",
  image_path: "/assets/images/patches.png"
)

# Create tiger
tiger = Pet.create(
  name: "Tiger",
  species: "cat",
  age: 3,
  color: "orange",
  breed: "siamese",
  favorite_food: "fish",
  favorite_toy: "yarn",
  description: "One big Cat, down boy !!!",
  image_path: "/assets/images/tiger.png"
)

# Create smokey
smokey = Pet.create(
  name: "Smokey",
  species: "cat",
  age: 4,
  color: "gray",
  breed: "persian",
  favorite_food: "fish",
  favorite_toy: "feather",
  description: "One smokey Cat, cough cough cough",
  image_path: "/assets/images/smokey.png"
)

# Create wilfred
wilfred = Pet.create(
  name: "Wilfred",
  species: "cat",
  age: 30,
  color: "white",
  breed: "persian",
  favorite_food: "Surströmming",
  favorite_toy: "yarn",
  celebrity: true,
  description: "One mean Cat, dont get close",
  image_path: "/assets/images/wilfred.png"
)

arthur = Pet.create(
  name: "Arthur",
  species: "dog",
  age: 8,
  color: "black & white",
  breed: "poodle",
  favorite_food: "cheese",
  favorite_toy: "teddy",
  featured: true,
  annoying_woof: true,
  description: "A great dog, who is friendly and always ready for a hug. P.S He doesnt like walks.",
  image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1600&q=60"
)

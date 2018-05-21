exports.seed = function(knex, Promise) {
  return (knex('photos').del()
    .then(() => {
      return Promise.all([
        knex('photos').insert([
          { name: 'Adventure1',
            url: 'https://arc.sdsu.edu/aztecadventures/images/slideshow/5.jpg' },
          { name: 'Adventure2',
            url: 'https://travel.home.sndimg.com/content/dam/images/travel/stock/2016/6/28/0/GettyImages-88831848_thailand-adventures-skydiving.jpg.rend.hgtvcom.966.725.suffix/1491841324080.jpeg' }
        ], 'id')
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    }))
};

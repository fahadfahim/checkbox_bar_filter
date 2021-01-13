var priceFormat = wNumb({prefix: '$', decimals: 2})
    var regularSlider = document.querySelector('.slider')
    var price = []
    // define items or get them via AJAX and then call the function renderItems()
    var items = [
        {
            name: 'awesome GPU 3000',
            category:'apple',
            vendor: 'Misan\'s goods',
            build_year: 2014,
            img: '/img/iPhone12-xl.jpg',
            price: 120.59,
            availability: true
        },
        {
            name: 'splendid GPU 5.3',
            vendor: 'Just stuff',
            category:'mi',
            build_year: 2015,
            img:'/img/mi-11.jpg',
            price: 199.59,
            availability: true
        },
        {
            name: 'cooling fan - Muffin!',
            vendor: 'Just stuff',
            category:'huawei',
            build_year: 2014,
            img:'/img/huawei-p40-pro-sliver.jpg',
            price: 32.29,
            availability: true
        },
        {
            name: 'cooling fan - Fridgeboy',
            vendor: 'Misan\'s goods',
            category:'asus',
            build_year: 2017,
            img:'/img/Asus-ROG-Phone-3.jpg',
            price: 41,
            availability: true
        },
        {
            name: 'PC Case - garage',
            vendor: 'Laughterhouse',
            category:'samsung',
            build_year: 2015,
            img:'/img/Samsung-Galaxy-Note-20-Ultra-back-front-mystic-black-1-675x675.jpg',
            price: 129,
            availability: false
        },
        {
            name: 'Mothershipboard Duck',
            vendor: 'Misan\'s goods',
            category:'asus',
            build_year: 2016,
            img:'/img/zenphone7.png',
            price: 87.50,
            availability: true
        },
        {
            name: 'Mediocre GPU - Lasercookie',
            vendor: 'Just stuff',
            category:'mi',
            build_year: 2017,
            img:"./img/mi-11.jpg",
            price: 79,
            availability: false
        },
        {
            name: 'Duststorm - Fan',
            vendor: 'Laughterhouse',
            category:'realme',
            build_year: 2017,
            img:'/img/Realme-7-Pro-Mirror-Blue.jpg',
            price: 8.55,
            availability: true
        },
        {
            name: 'Gaming Ferret 3872 - Computer mouse',
            vendor: 'Laughterhouse',
            category:'oneplus',
            build_year: 2014,
            img:'/img/oneplus.jpg',
            price: 44.5,
            availability: true
        },
    ]
    // Initial render with the items
    // The function renderItems is defined later (which is no problem in javascript)
    renderItems(items)
    
    // slider setup
    var slider = noUiSlider.create(regularSlider, {
        start: [-Infinity, Infinity], // always start and end of the range
        connect: true,
        tooltips: [wNumb({prefix: '$', decimals: 0}), wNumb({prefix: '$', decimals: 0})],
        // pips: {
        //     mode: 'steps',
        //     density: 5
        // },
        range: this.getPriceRange(this.items)
    })

 

    // on slider update, call filterItems and render them
    slider.on('update', function(values){
        let filteredItems = filterItems(items, values)
        renderItems(filteredItems)
    })
    
    function getPriceRange(items) {
        let min = items.reduce(function(acc, value){
            return acc < value.price ? acc : value.price
        })
        let max = items.reduce(function(acc, value){
            return acc > value.price ? acc : value.price
        })
        return {min: min, max: max}
    }
    
    function filterItems(items, price) {
        return items.filter(item => {
            return item.price >= price[0] && item.price <= price[1]
        })
        change();
    }
    
    function renderItems(items) {
        var counter = document.querySelector('.counter')
        counter.innerHTML = `Your search matches <b>${items.length}</b> result${items.length == 1 ? '' : 's'}`
        var table = document.querySelector('.results')
            table.innerHTML = items.map(item=>{return `

            <div class="card ${item.category}" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${priceFormat.to(item.price)}</p>
              <p class="card-text">${item.availability ? '#58D288' : '#C43828'}"><span hide-gt-sm>Available</span>${''+item.availability}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
            `
        }).join('')
        // we need join(''), because we do an array to string conversion here.
        // otherwise, the items would be connected with ","
    }

    const change = () =>{
        let results = Array.from(document.querySelectorAll('.results > div'));
        console.log(results);
      // Hide all results
      results.forEach((result) => result.style.display = 'none');
    
      // Filter results to only those that meet ALL requirements:
      Array.from(document.querySelectorAll('.filter input[rel]:checked'), (input) =>{
        const attrib = input.getAttribute('rel');
        results = results.filter((result) => result.classList.contains(attrib))
      })
    
      // Show those filtered results:
      results.forEach((result) => result.style.display = 'block')
    }
    
    change();


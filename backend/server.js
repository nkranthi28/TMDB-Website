const axios = require('axios');
var express = require('express');
var app = express();

app.use(express.json());
const path= require('path')
app.use(express.static(process.cwd()+"/dist/frontend/"));
app.use('/',express.static('dist/frontend'))
app.use('/watch/*',express.static('dist/frontend'))
app.use('/mylist/',express.static('dist/frontend'))


app.get('/search', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const term = req.query.term;
    search_url = 'https://api.themoviedb.org/3/search/multi?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&query='+term;
    
    search_results = await axios.get(search_url)
    .then(function(response) {
        var multiple_data = response.data.results;
        search_array = [];
        if (multiple_data.length!=0){
            for(i=0;i<multiple_data.length;i++){
                if(multiple_data[i].backdrop_path){
                    if (multiple_data[i].media_type == 'movie'){
                        search_fields = {};
                        search_fields['id'] = multiple_data[i].id;
                        search_fields['title'] = multiple_data[i].title;
                        search_fields ['backdrop_path'] = 'https://image.tmdb.org/t/p/w500' + multiple_data[i].backdrop_path;
                        search_fields['media_type'] = multiple_data[i].media_type;
                        search_array.push(search_fields);
                    }
                    if (multiple_data[i].media_type == 'tv'){
                        search_fields = {};
                        search_fields['id'] = multiple_data[i].id;
                        search_fields['title'] = multiple_data[i].name;
                        search_fields ['backdrop_path'] = 'https://image.tmdb.org/t/p/w500' + multiple_data[i].backdrop_path;
                        search_fields['media_type'] = multiple_data[i].media_type;
                        search_array.push(search_fields);
                    }      
                } 
            }
        }
        return search_array.slice(0,7);
    })
    res.send(search_results);
  })

app.get('/main', async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    carousel_url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    popular_url = 'https://api.themoviedb.org/3/movie/popular?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    top_rated_url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    trending_url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=ef0f49cc4f747effb674303a7c49e03a';
    popular_tv_url = 'https://api.themoviedb.org/3/tv/popular?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    top_rated_tv_url = 'https://api.themoviedb.org/3/tv/top_rated?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    trending_tv_url = 'https://api.themoviedb.org/3/trending/tv/day?api_key=ef0f49cc4f747effb674303a7c49e03a';
    data = {}
    
    await axios.get(carousel_url)
    .then(function(response) {
        var carousel_data = response.data.results.slice(0,5);
        carousel_array = [];
        if (carousel_data.length!=0){
            for(i=0;i<carousel_data.length;i++){
                if (carousel_data[i].title.length!=0){
                    carousel_fields = {};
                    carousel_fields['id'] = carousel_data[i].id;
                    carousel_fields['title'] = carousel_data[i].title;
                    if (carousel_data[i].backdrop_path){
                        carousel_fields['backdrop_path'] = 'https://image.tmdb.org/t/p/w780' + carousel_data[i].backdrop_path;
                    }
                    else{

                    }
                    carousel_array.push(carousel_fields);
                }   
            }
        }
        data['carousel_data'] = carousel_array;

    })

    await axios.get(popular_url)
    .then(function(response) {
        var popular_data = response.data.results;
        popular_array = [];
        if (popular_data.length!=0){
            for(i=0;i<popular_data.length;i++){
                if (popular_data[i].title.length!=0){
                    popular_fields = {};
                    popular_fields['id'] = popular_data[i].id;
                    popular_fields['title'] = popular_data[i].title;
                    if (popular_data[i].poster_path){
                        popular_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + popular_data[i].poster_path;
                    }
                    else{
                        popular_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    popular_array.push(popular_fields);
                }   
            }
        }
        data['popular_data'] = popular_array;

    })

    await axios.get(top_rated_url)
    .then(function(response) {
        var top_rated_data = response.data.results;
        top_rated_array = [];
        if (top_rated_data.length!=0){
            for(i=0;i<top_rated_data.length;i++){
                if (top_rated_data[i].title.length!=0){
                    top_rated_fields = {};
                    top_rated_fields['id'] = top_rated_data[i].id;
                    top_rated_fields['title'] = top_rated_data[i].title;
                    if (top_rated_data[i].poster_path){ 
                        top_rated_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + top_rated_data[i].poster_path;
                    }
                    else{
                        top_rated_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    top_rated_array.push(top_rated_fields);
                }   
            }
        }
        data['top_rated_data'] = top_rated_array;

    })


    await axios.get(trending_url)
    .then(function(response) {
        var trending_data = response.data.results;
        trending_array = [];
        if (trending_data.length!=0){
            for(i=0;i<trending_data.length;i++){
                if (trending_data[i].title.length!=0){
                    trending_fields = {};
                    trending_fields['id'] = trending_data[i].id;
                    trending_fields['title'] = trending_data[i].title;
                    if (trending_data[i].poster_path){
                        trending_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + trending_data[i].poster_path;
                    }
                    else{
                        trending_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    trending_array.push(trending_fields);
                }   
            }
        }
        data['trending_data'] = trending_array;

    })

    await axios.get(popular_tv_url)
    .then(function(response) {
        var popular_tv_data = response.data.results;
        popular_tv_array = [];
        if (popular_tv_data.length!=0){
            for(i=0;i<(popular_tv_data.length);i++){
                if (popular_tv_data[i].name.length!=0){
                    popular_tv_fields = {};
                    popular_tv_fields['id'] = popular_tv_data[i].id;
                    popular_tv_fields['title'] = popular_tv_data[i].name;
                    if (popular_tv_data[i].poster_path){
                        popular_tv_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + popular_tv_data[i].poster_path;
                    }
                    else{
                        popular_tv_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    popular_tv_array.push(popular_tv_fields);
                }   
            }
        }
        data['popular_tv_data'] = popular_tv_array;

    })

    await axios.get(top_rated_tv_url)
    .then(function(response) {
        var top_rated_tv_data = response.data.results;
        top_rated_tv_array = [];
        if (top_rated_tv_data.length!=0){
            for(i=0;i<(top_rated_tv_data.length);i++){
                if (top_rated_tv_data[i].name.length!=0){
                    top_rated_tv_fields = {};
                    top_rated_tv_fields['id'] = top_rated_tv_data[i].id;
                    top_rated_tv_fields['title'] = top_rated_tv_data[i].name;
                    if(top_rated_tv_data[i].poster_path){
                        top_rated_tv_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + top_rated_tv_data[i].poster_path;
                    }
                    else{
                        top_rated_tv_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    top_rated_tv_array.push(top_rated_tv_fields);
                }   
            }
        }
        data['top_rated_tv_data'] = top_rated_tv_array;

    })


    await axios.get(trending_tv_url)
    .then(function(response) {
        var trending_tv_data = response.data.results;
        trending_tv_array = [];
        if (trending_tv_data.length!=0){
            for(i=0;i<(trending_tv_data.length);i++){
                if (trending_tv_data[i].name.length!=0){
                    trending_tv_fields = {};
                    trending_tv_fields['id'] = trending_tv_data[i].id;
                    trending_tv_fields['title'] = trending_tv_data[i].name;
                    if(trending_tv_data[i].poster_path){
                        trending_tv_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + trending_tv_data[i].poster_path;
                    }
                    else{
                        trending_tv_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png'
                    }
                    trending_tv_array.push(trending_tv_fields);
                }   
            }
        }
        data['trending_tv_data'] = trending_tv_array;

    })


    res.send(data)

    // .catch(error => {
    //     console.log(error);
    // })
})

//cast details
app.get('/cast', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const cast_id = req.query.id;
    // console.log(cast_id);
    cast = {
        'cast_details_data':[],
        'cast_external_ids_data':[]
    };
    movie_cast_details_url = 'https://api.themoviedb.org/3/person/'+cast_id+'?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    movie_cast_external_ids_url = 'https://api.themoviedb.org/3/person/'+cast_id+'/external_ids?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';


    //cast details data
    cast_details = await axios.get(movie_cast_details_url)
    .then(function(response) {
        var movie_cast_details_data = response.data;
        movie_cast_details_array = [];
        
        if (movie_cast_details_data.length!=0)
       {
        movie_cast_details_fields = {};
            if (movie_cast_details_data.name){
                movie_cast_details_fields['name'] = movie_cast_details_data.name;
            }
            if (movie_cast_details_data.profile_path){
                movie_cast_details_fields['profile_path'] = 'https://image.tmdb.org/t/p/w500/' + movie_cast_details_data.profile_path;
            }
            if (movie_cast_details_data.birthday){
                movie_cast_details_fields['birthday'] = movie_cast_details_data.birthday;
            }
            if (movie_cast_details_data.place_of_birth){
                movie_cast_details_fields['place_of_birth'] = movie_cast_details_data.place_of_birth;
            }
            if (movie_cast_details_data.gender){
                if (movie_cast_details_data.gender == 1){
                    movie_cast_details_fields['gender'] = 'Female';
                }
                else{
                    movie_cast_details_fields['gender'] = 'Male';
                }
                
            }
            if (movie_cast_details_data.known_for_department){
                movie_cast_details_fields['known_for_department'] = movie_cast_details_data.known_for_department;
            }
            if (movie_cast_details_data.also_known_as){
                var also_known_as = []
                for(i=0; i<movie_cast_details_data.also_known_as.length;i++){
                    also_known_as.push(movie_cast_details_data.also_known_as[i]);
                }
                if (also_known_as.length != 0){
                    movie_cast_details_fields['also_known_as'] = also_known_as;
                }
            }
            if (movie_cast_details_data.biography){
                movie_cast_details_fields['biography'] = movie_cast_details_data.biography;
            }
                movie_cast_details_array.push(movie_cast_details_fields);
       }
            
    return movie_cast_details_array;
    });

    cast['cast_details_data'].push(cast_details);

     //External ids data
     cast_external_id_details = await axios.get(movie_cast_external_ids_url)
     .then(function(response) {
         var movie_cast_external_ids_data = response.data;
         movie_cast_external_ids_array = [];
         
         if (movie_cast_external_ids_data.length!=0)
        {
             movie_cast_external_ids_fields = {};
             if (movie_cast_external_ids_data.imdb_id){
                 movie_cast_external_ids_fields['imdb_id'] = 'https://www.imdb.com/name/' + movie_cast_external_ids_data.imdb_id;
             }
             if (movie_cast_external_ids_data.facebook_id){
                 movie_cast_external_ids_fields['facebook_id'] = 'https://facebook.com/' + movie_cast_external_ids_data.facebook_id;
             }
             if (movie_cast_external_ids_data.instagram_id){
                 movie_cast_external_ids_fields['instagram_id'] = 'https://instagram.com/' + movie_cast_external_ids_data.instagram_id;
             }
             if (movie_cast_external_ids_data.twitter_id){
                 movie_cast_external_ids_fields['twitter_id'] = 'https://twitter.com/' + movie_cast_external_ids_data.twitter_id;
             }
                 movie_cast_external_ids_array.push(movie_cast_external_ids_fields);
        }
             
     return movie_cast_external_ids_array;
     });

     cast['cast_external_ids_data'].push(cast_external_id_details);

     res.send(cast);

})


// Watch movies
app.get('/watch', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    watch = {
        'video_data': [],
        'details_data': [],
        'reviews_data': [],
        'cast_data': [],
        'recommended_data':[],
        'similar_data':[]
    };
    //Getting the parameters
    const id = req.query.id;
    const media_type = req.query.media_type;
    
    //Getting the data from urls
    movie_video_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'/videos?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    movie_details_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    movie_reviews_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'/reviews?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    movie_cast_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'/credits?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    movie_recommended_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'/recommendations?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    movie_similar_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'/similar?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1';
    tv_video_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'/videos?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    tv_details_url = 'https://api.themoviedb.org/3/'+media_type+'/'+id+'?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    // tv_reviews_url = 'https://api.themoviedb.org/3/tv/464052/reviews?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    // tv_cast_url = 'https://api.themoviedb.org/3/tv/464052/credits?api_key=ef0f49cc4f747effb674303a7c49e03a&language=en-US&page=1';
    
    //if the media_type is movie
    if (media_type == 'movie')
    {
        video = await axios.get(movie_video_url)
        .then(function(response) {
            var movie_video_data = response.data.results;
            movie_video_array = [];
            if (movie_video_data.length!=0)
            {
                for(i=0;i<movie_video_data.length;i++)
                {   
                    if (movie_video_data[i].type == 'Trailer')
                    {
                        movie_video_fields = {};
                        movie_video_fields['site'] = movie_video_data[i].site;
                        movie_video_fields['type'] = movie_video_data[i].type;
                        movie_video_fields['name'] = movie_video_data[i].name;
                        movie_video_fields ['key'] = movie_video_data[i].key;
                        movie_video_array.push(movie_video_fields);
                        break;
                    }
                    else if (movie_video_data[i].type == 'Teaser'){
                        movie_video_fields = {};
                        movie_video_fields['site'] = movie_video_data[i].site;
                        movie_video_fields['type'] = movie_video_data[i].type;
                        movie_video_fields['name'] = movie_video_data[i].name;
                        movie_video_fields ['key'] = movie_video_data[i].key;
                        movie_video_array.push(movie_video_fields);
                        break;
                    }
                    else{
                        movie_video_fields = {};
                        movie_video_fields['site'] = movie_video_data[i].site;
                        movie_video_fields['type'] = movie_video_data[i].type;
                        movie_video_fields['name'] = movie_video_data[i].name;
                        movie_video_fields ['key'] = 'tzkWB85ULJY';
                        movie_video_array.push(movie_video_fields);
                        break;
                    }
                    
                }
            }
            else{
                movie_video_fields = {};
                movie_video_fields ['key'] = 'tzkWB85ULJY';
                movie_video_array.push(movie_video_fields);
            }
            return movie_video_array;
            
        });
        watch['video_data'].push(video);

        // movie details data
        details = await axios.get(movie_details_url)
        .then(function(response) {
            var movie_details_data = response.data;
            movie_details_array = [];
            movie_details_fields = {};
            movie_details_fields['original_title'] = movie_details_data.title;

            //movie_genres
            movie_genres = []
            for(i=0;i<movie_details_data.genres.length;i++){
                movie_genres.push(movie_details_data.genres[i].name);
            }
            movie_details_fields['genres'] = movie_genres.join(', ');;

            //movie spoken_languages
            movie_spoken_languages = []
            for(i=0;i<movie_details_data.spoken_languages.length;i++){
                movie_spoken_languages.push(movie_details_data.spoken_languages[i].name);
            }

            movie_details_fields['spoken_languages'] = movie_spoken_languages.join(', ');
            var d = new Date(movie_details_data.release_date);
                
            movie_details_fields['release_date'] = d.getFullYear();
            movie_details_fields['runtime_hours'] = parseInt(movie_details_data.runtime/100);
            movie_details_fields['runtime_minutes'] = movie_details_data.runtime%100;
            movie_details_fields['overview'] = movie_details_data.overview;
            movie_details_fields['vote_average'] = movie_details_data.vote_average;
            movie_details_fields['tagline'] = movie_details_data.tagline;
            if (movie_details_data.poster_path){
                movie_details_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + movie_details_data.poster_path;
            }
            else{
                movie_details_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
            }
            movie_details_array.push(movie_details_fields);
                
            return movie_details_array;
        });

        watch['details_data'].push(details);

         // movie cast data
         cast = await axios.get(movie_cast_url)
         .then(function(response) {
             var movie_cast_data = response.data.cast;
             movie_cast_array = [];
             if (movie_cast_data.length!=0)
            {
                for(i=0;i<movie_cast_data.length;i++){
                    if (movie_cast_data[i].profile_path){
                        movie_cast_fields = {};
                        movie_cast_fields['id'] = movie_cast_data[i].id;
                        movie_cast_fields['original_name'] = movie_cast_data[i].original_name;
                        movie_cast_fields['character'] = movie_cast_data[i].character;
                        movie_cast_fields['profile_path'] = 'https://image.tmdb.org/t/p/w500/' + movie_cast_data[i].profile_path;
                        movie_cast_array.push(movie_cast_fields);
                    } 
                }  
            }
                 
        return movie_cast_array;
         });
 
        watch['cast_data'].push(cast);

        //movie reviews data
        reviews = await axios.get(movie_reviews_url)
        .then(function(response) {
            var movie_reviews_data = response.data.results.slice(0,10);
            movie_reviews_array = [];
            if (movie_reviews_data.length!=0)
           {
               for(i=0;i<movie_reviews_data.length;i++){
                //    console.log(movie_reviews_data[i].author_details.avatar_path);
                   if (movie_reviews_data[i].author_details.avatar_path){
                        movie_reviews_fields = {};
                        movie_reviews_fields['author'] = movie_reviews_data[i].author;
                        movie_reviews_fields['content'] = movie_reviews_data[i].content;
                        //Getting date, month and year from created_at reviews
                        var review_date = new Date(movie_reviews_data[i].created_at);
                        movie_reviews_fields['created_at_month'] = review_date.toLocaleString('default', { month: 'long' });
                        movie_reviews_fields['created_at_year'] = review_date.getFullYear();
                        movie_reviews_fields['created_at_date'] = review_date.getDate();
                        movie_reviews_fields['created_at_time'] = review_date.toLocaleTimeString('en-US');
                        //No review rating condition
                        if (movie_reviews_data[i].author_details.rating){
                            movie_reviews_fields['rating'] = movie_reviews_data[i].author_details.rating;
                        }
                        else{
                            movie_reviews_fields['rating'] = 0;
                        }
                        movie_reviews_fields['url'] = movie_reviews_data[i].url;
                        if (movie_reviews_data[i].author_details.avatar_path.includes('com')){
                            while(movie_reviews_data[i].author_details.avatar_path.charAt(0) === '/')
                                {
                                    movie_reviews_data[i].author_details.avatar_path = movie_reviews_data[i].author_details.avatar_path.substring(1);
                                }
                            movie_reviews_fields['avatar_path'] = movie_reviews_data[i].author_details.avatar_path
                        }
                        else{
                            movie_reviews_fields['avatar_path'] = 'https://image.tmdb.org/t/p/w500/' + movie_reviews_data[i].author_details.avatar_path;
                        }
                        
                        movie_reviews_array.push(movie_reviews_fields);
                   }
                   else{
                    movie_reviews_fields = {};
                    movie_reviews_fields['author'] = movie_reviews_data[i].author;
                    movie_reviews_fields['content'] = movie_reviews_data[i].content;
                    //Getting date, month and year from created_at reviews
                    var review_date = new Date(movie_reviews_data[i].created_at);
                        movie_reviews_fields['created_at_month'] = review_date.toLocaleString('default', { month: 'long' });
                        movie_reviews_fields['created_at_year'] = review_date.getFullYear();
                        movie_reviews_fields['created_at_date'] = review_date.getDate();
                        movie_reviews_fields['created_at_time'] = review_date.toLocaleTimeString('en-US');
                    //No review rating condition
                    if (movie_reviews_data[i].author_details.rating){
                        movie_reviews_fields['rating'] = movie_reviews_data[i].author_details.rating;
                    }
                    else{
                        movie_reviews_fields['rating'] = 0;
                    }
                    movie_reviews_fields['url'] = movie_reviews_data[i].url;
                    movie_reviews_fields['avatar_path'] = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU';
                    movie_reviews_array.push(movie_reviews_fields);
                   }
                    
               }  
           }
                
        return movie_reviews_array;
        });

        watch['reviews_data'].push(reviews);

        // recommended movies
        recommended = await axios.get(movie_recommended_url)
        .then(function(response) {
            var movie_recommended_data = response.data.results;
            movie_recommended_array = [];
            if (movie_recommended_data.length!=0){
                for(i=0;i<movie_recommended_data.length;i++){
                    movie_recommended_fields = {};
                    movie_recommended_fields['id'] = movie_recommended_data[i].id;
                    movie_recommended_fields['title'] = movie_recommended_data[i].title;
                    if (movie_recommended_data[i].poster_path){
                        movie_recommended_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + movie_recommended_data[i].poster_path;
                    }
                    else{
                        movie_recommended_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    movie_recommended_array.push(movie_recommended_fields);
                }
            }
            return movie_recommended_array;
        });

        watch['recommended_data'] = recommended;

        //similar data
        similar = await axios.get(movie_similar_url)
        .then(function(response) {
            var movie_similar_data = response.data.results;
            movie_similar_array = [];
            if (movie_similar_data.length!=0){
                for(i=0;i<movie_similar_data.length;i++){
                    movie_similar_fields = {};
                    movie_similar_fields['id'] = movie_similar_data[i].id;
                    movie_similar_fields['title'] = movie_similar_data[i].title;
                    if(movie_similar_data[i].poster_path){
                        movie_similar_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + movie_similar_data[i].poster_path;
                    }
                    else{
                        movie_similar_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    movie_similar_array.push(movie_similar_fields);
                }
            }
            return movie_similar_array;
        });

        watch['similar_data'] = similar;

    res.send(watch);
    }



    else{
        tv_video = await axios.get(tv_video_url)
        .then(function(response) {
            var tv_video_data = response.data.results;
            tv_video_array = [];
            if (tv_video_data.length!=0)
            {
                for(i=0;i<tv_video_data.length;i++)
                {   
                    if (tv_video_data[i].type == 'Trailer')
                    {
                        tv_video_fields = {};
                        tv_video_fields['site'] = tv_video_data[i].site;
                        tv_video_fields['type'] = tv_video_data[i].type;
                        tv_video_fields['name'] = tv_video_data[i].name;
                        tv_video_fields ['key'] = tv_video_data[i].key;
                        tv_video_array.push(tv_video_fields);
                        break;
                    }
                    else if (tv_video_data[i].type == 'Teaser'){
                        tv_video_fields = {};
                        tv_video_fields['site'] = tv_video_data[i].site;
                        tv_video_fields['type'] = tv_video_data[i].type;
                        tv_video_fields['name'] = tv_video_data[i].name;
                        tv_video_fields ['key'] = tv_video_data[i].key;
                        tv_video_array.push(tv_video_fields);
                        break;
                    }
                    else{
                        tv_video_fields = {};
                        tv_video_fields['site'] = tv_video_data[i].site;
                        tv_video_fields['type'] = tv_video_data[i].type;
                        tv_video_fields['name'] = tv_video_data[i].name;
                        tv_video_fields ['key'] = 'tzkWB85ULJY';
                        tv_video_array.push(tv_video_fields);
                        break;
                    }
                    
                }
            }
            else{
                tv_video_fields = {};
                tv_video_fields ['key'] = 'tzkWB85ULJY';
                tv_video_array.push(tv_video_fields);
            }
            return tv_video_array;
            
        });
        watch['video_data'].push(tv_video);

        // tv details data
        tv_details = await axios.get(tv_details_url)
        .then(function(response) {
            var tv_details_data = response.data;
            tv_details_array = [];
            tv_details_fields = {};
            tv_details_fields['original_title'] = tv_details_data.name;

            //tv_genres
            tv_genres = []
            for(i=0;i<tv_details_data.genres.length;i++){
                tv_genres.push(tv_details_data.genres[i].name);
            }
            tv_details_fields['genres'] = tv_genres.join(', ');

            //tv spoken_languages
            tv_spoken_languages = []
            for(i=0;i<tv_details_data.spoken_languages.length;i++){
                tv_spoken_languages.push(tv_details_data.spoken_languages[i].name);
            }

            tv_details_fields['spoken_languages'] = tv_spoken_languages.join(', ');
            var d = new Date(tv_details_data.first_air_date);
                
            // tv_details_fields['release_date'] = d.getFullYear();
            if (parseInt(tv_details_data.episode_run_time/100)){
                tv_details_fields['runtime_hours'] = parseInt(tv_details_data.episode_run_time[0]/100);
            }
            if(tv_details_data.episode_run_time[0]%100 >= 60){
                tv_details_fields['runtime_hours'] = parseInt(tv_details_data.episode_run_time[0]/60);
                if (tv_details_data.episode_run_time[0]%60>0)
                tv_details_fields['runtime_minutes'] = tv_details_data.episode_run_time[0]%60;
            }
            else{
                tv_details_fields['runtime_minutes'] = tv_details_data.episode_run_time[0]%100;
            }
            tv_details_fields['overview'] = tv_details_data.overview;
            tv_details_fields['vote_average'] = tv_details_data.vote_average;
            tv_details_fields['tagline'] = tv_details_data.tagline;
            if (tv_details_data.poster_path){
                tv_details_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + tv_details_data.poster_path;
            }
            else{
                tv_details_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
            }
            tv_details_array.push(tv_details_fields);
                
            return tv_details_array;
        });

        watch['details_data'].push(tv_details);

         // tv cast data
         cast = await axios.get(movie_cast_url)
         .then(function(response) {
             var movie_cast_data = response.data.cast;
             movie_cast_array = [];
             if (movie_cast_data.length!=0)
            {
                for(i=0;i<movie_cast_data.length;i++){
                    if (movie_cast_data[i].profile_path){
                        movie_cast_fields = {};
                        movie_cast_fields['id'] = movie_cast_data[i].id;
                        movie_cast_fields['original_name'] = movie_cast_data[i].original_name;
                        movie_cast_fields['character'] = movie_cast_data[i].character;
                        movie_cast_fields['profile_path'] = 'https://image.tmdb.org/t/p/w500/' + movie_cast_data[i].profile_path;
                        movie_cast_array.push(movie_cast_fields);
                    } 
                }  
            }
                 
        return movie_cast_array;
         });
 
        watch['cast_data'].push(cast);

        //tv reviews data
        reviews = await axios.get(movie_reviews_url)
        .then(function(response) {
            var movie_reviews_data = response.data.results.slice(0,10);
            movie_reviews_array = [];
            if (movie_reviews_data.length!=0)
           {
               for(i=0;i<movie_reviews_data.length;i++){
                
                   if (movie_reviews_data[i].author_details.avatar_path){
                        movie_reviews_fields = {};
                        movie_reviews_fields['author'] = movie_reviews_data[i].author;
                        movie_reviews_fields['content'] = movie_reviews_data[i].content;
                        //Getting date, month and year from created_at reviews
                        var review_date = new Date(movie_reviews_data[i].created_at);
                        movie_reviews_fields['created_at_month'] = review_date.toLocaleString('default', { month: 'long' });
                        movie_reviews_fields['created_at_year'] = review_date.getFullYear();
                        movie_reviews_fields['created_at_date'] = review_date.getDate();
                        movie_reviews_fields['created_at_time'] = review_date.toLocaleTimeString('en-US');
                        //No review rating condition
                        if (movie_reviews_data[i].author_details.rating){
                            movie_reviews_fields['rating'] = movie_reviews_data[i].author_details.rating;
                        }
                        else{
                            movie_reviews_fields['rating'] = '0';
                        }
                        movie_reviews_fields['url'] = movie_reviews_data[i].url;
                        if (movie_reviews_data[i].author_details.avatar_path.includes('com')){
                            while(movie_reviews_data[i].author_details.avatar_path.charAt(0) === '/')
                                {
                                    movie_reviews_data[i].author_details.avatar_path = movie_reviews_data[i].author_details.avatar_path.substring(1);
                                }
                            movie_reviews_fields['avatar_path'] = movie_reviews_data[i].author_details.avatar_path
                        }
                        else{
                            movie_reviews_fields['avatar_path'] = 'https://image.tmdb.org/t/p/w500/' + movie_reviews_data[i].author_details.avatar_path;
                        }
                        
                        movie_reviews_array.push(movie_reviews_fields);
                   }
                   else{
                    movie_reviews_fields = {};
                    movie_reviews_fields['author'] = movie_reviews_data[i].author;
                    movie_reviews_fields['content'] = movie_reviews_data[i].content;
                    //Getting date, month and year from created_at reviews
                    var review_date = new Date(movie_reviews_data[i].created_at);
                        movie_reviews_fields['created_at_month'] = review_date.toLocaleString('default', { month: 'long' });
                        movie_reviews_fields['created_at_year'] = review_date.getFullYear();
                        movie_reviews_fields['created_at_date'] = review_date.getDate();
                        movie_reviews_fields['created_at_time'] = review_date.toLocaleTimeString('en-US');
                    //No review rating condition
                    if (movie_reviews_data[i].author_details.rating){
                        movie_reviews_fields['rating'] = movie_reviews_data[i].author_details.rating;
                    }
                    else{
                        movie_reviews_fields['rating'] = 0;
                    }
                    movie_reviews_fields['url'] = movie_reviews_data[i].url;
                    movie_reviews_fields['avatar_path'] = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU';
                    movie_reviews_array.push(movie_reviews_fields);
                   }
                    
               }  
           }
                
        return movie_reviews_array;
        });

        watch['reviews_data'].push(reviews);

        // recommended tv shows
        recommended = await axios.get(movie_recommended_url)
        .then(function(response) {
            var movie_recommended_data = response.data.results;
            movie_recommended_array = [];
            if (movie_recommended_data.length!=0){
                for(i=0;i<movie_recommended_data.length;i++){
                    movie_recommended_fields = {};
                    movie_recommended_fields['id'] = movie_recommended_data[i].id;
                    movie_recommended_fields['title'] = movie_recommended_data[i].name;
                    if(movie_recommended_data[i].poster_path){
                        movie_recommended_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + movie_recommended_data[i].poster_path;
                    }
                    else{
                        movie_recommended_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    movie_recommended_array.push(movie_recommended_fields);
                }
            }
            return movie_recommended_array;
        });

        watch['recommended_data'] = recommended;

        //similar tv shows
        similar = await axios.get(movie_similar_url)
        .then(function(response) {
            var movie_similar_data = response.data.results;
            movie_similar_array = [];
            if (movie_similar_data.length!=0){
                for(i=0;i<movie_similar_data.length;i++){
                    movie_similar_fields = {};
                    movie_similar_fields['id'] = movie_similar_data[i].id;
                    movie_similar_fields['title'] = movie_similar_data[i].name;
                    if(movie_similar_data[i].poster_path){
                        movie_similar_fields['poster_path'] = 'https://image.tmdb.org/t/p/w500' + movie_similar_data[i].poster_path;
                    }
                    else{
                        movie_similar_fields['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png';
                    }
                    movie_similar_array.push(movie_similar_fields);
                }
            }
            return movie_similar_array;
        });

        watch['similar_data'] = similar;

    res.send(watch);
    }
    
})
var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})
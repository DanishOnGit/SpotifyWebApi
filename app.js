let genreSelect=document.querySelector(".genre");
let playlistSelect=document.querySelector(".playlists");

let id=myid;
let key=token;

const ApiResponseControl=(function(){

    const getToken=async()=>{
        let response;
       try{
        console.log("hello")
          response= await fetch("https://accounts.spotify.com/api/token",{
            method:"POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                
                "Authorization":"Basic " + btoa(id +":"+ key)
                
            },
            body:"grant_type=client_credentials"
                
        }) ;
       } catch(err){
           console.log(err)
       }
       const data=await  response.json();
    //    console.log(data.access_token)
       return  data.access_token
    
    } 
    
    const getGenres=async(token)=>{
        let result;
        
        try{
             result=await fetch("https://api.spotify.com/v1/browse/categories",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+ token
            }
    
        });
        }
        catch(err){
            console.log(err)
        }
        
        const data=await result.json();
        // console.log(data);
        // console.log(data.categories.items)
        return data.categories.items
    }
  

    return {
        _getToken(){
            return getToken()
        },
        _getGenre(token){
            return getGenres(token)
        }
    }
}) ();


//getting token
// let tokenfunc=ApiResponseControl._getToken
// tokenfunc();
// console.log(ApiResponseControl)
// console.log("wowow")
//geting genres
// let genrefunc=ApiResponseControl._getGenre
// console.log(genrefunc(tokenValue))

 const controllerFunc=(function(Apiresctrl){
     console.log("controllerFunc running1");
    const loadGenres=async()=>{
        console.log("controllerFunc running2")
        const token=await Apiresctrl._getToken();
        const genres=await Apiresctrl._getGenre(token);
        console.log(genres);
        genres.forEach(element => {
            // console.log(element.name)
            // const html=`<option value="${element.id}">${element.name}</option>`;
            // genreSelect.innerHTML+=html
            const option=document.createElement("option")
            option.classList.add("genreOption");
            console.log(option)
            // console.log(document.getElementsByClassName("genreOption"))
            // document.getElementsByClassName("genreOption")[0].innerHTML=element.name
            option.value=element.id
            genreSelect.appendChild(option)
            
        });
    
        
        
    }
    loadGenres();
    // return {
    //     _loadGenres(){
    //         return loadGenres();
    //     }
    // }
 })(ApiResponseControl);
//  console.log((controllerFunc._loadGenres)());
// console.log(controllerFunc._loadGenres())
 









// async function getPlaylists(token,genreId){
//     const result=await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,{
//         method:"GET",
//         headers:{
//             "Authorization":"Bearer "+token
//         }
//     });
//     const data=await result.json();
//     return data.playlists.items
// }



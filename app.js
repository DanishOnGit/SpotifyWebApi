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
       const data= response.json();
       console.log(data)
      
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
        console.log(data);
        console.log(data.categories.items)
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
console.log(ApiResponseControl._getToken)






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
// async function getTracks(token,)


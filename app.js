let id=myid;
let key=token;
async function getToken(){
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
   const data= await response.json();
   return data.access_token

}getToken();

async function getGenres(token){
    const result=await fetch("https://api.spotify.com/v1/browse/categories",{
        method:"GET",
        headers:{
            "Authorization":"Bearer "+token
        }

    });
    const data=await result.json();
    return data.categories.items
}
async function getPlaylists(token,genreId){
    const result=await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,{
        method:"GET",
        headers:{
            "Authorization":"Bearer "+token
        }
    });
    const data=await result.json();
    return data.playlists.items
}
async function getTracks(token,)
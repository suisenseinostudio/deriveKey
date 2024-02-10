const importKey=async(pass)=>{
  try{
    const data=(new TextEncoder()).encode(pass);
    return self.crypto.subtle.importKey("raw",data,"PBKDF2",false,["deriveKey"]);
  }catch(err){
    console.error(`error in importKey:${err.name}:${err.message})`);
  }
};

export const deriveKey=async(pass)=>{
  try{
    const salt=self.crypto.getRandomValues(new Uint8Array(16));
    const algo={name:"PBKDF2",hash:"SHA-256",salt,iterations:100000};
    const base=await importKey(pass);
    return self.crypto.subtle.deriveKey(algo,base,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);
  }catch(err){
    console.error(`error in deriveKey:${err.name}:${err.message})`);
  }
};

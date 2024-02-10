import {deriveKey} from "./derive-key.js";

export const enc=async(file,pass)=>{
  const iv=window.crypto.getRandomValues(new Uint8Array(12));
  const algo={name:"AES-GCM",iv};
  const key=await deriveKey(pass);
  const data=await (new Blob([iv,file])).arrayBuffer();
  console.log(`enc(${JSON.stringify(algo)},key(${pass}),${new Uint8Array(data)})`);
  const ab=await window.crypto.subtle.encrypt(algo,key,data);
  console.log(`result:${new Uint8Array(ab)}`);
  return new File([iv,ab],file.name+"-e");
};

export const dec=async(res,pass)=>{
  const iv=new Uint8Array(res,0,12);
  const algo={name:"AES-GCM",iv};
  const key=await deriveKey(pass);
  const ab=res.slice(12,res.byteLength);
  console.log(`dec(${JSON.stringify(algo)},key(${pass}),${new Uint8Array(ab)})`);
  const rtn=await crypto.subtle.decrypt(algo,key,ab);
  console.log(`result:${new Uint8Array(rtn)}`);
  return rtn;
};

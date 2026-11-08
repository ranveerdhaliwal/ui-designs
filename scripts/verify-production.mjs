import {spawn} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const base='http://127.0.0.1:5183/ui-designs/';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5183','--strictPort'],{cwd:path.join(root,'apps/web'),stdio:'inherit'});
let startupError;server.on('error',e=>{startupError=e;});
const run=file=>new Promise((resolve,reject)=>{const child=spawn(process.execPath,[file],{cwd:root,env:{...process.env,BASE_URL:base},stdio:'inherit'});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(`${file} exited ${code}`)));});
try{
 let ready=false;
 for(let i=0;i<60;i++){if(startupError)throw startupError;if(server.exitCode!==null)throw new Error('Preview server could not start.');try{ready=(await fetch(base)).ok;}catch{/* Wait for Vite. */}if(ready)break;await new Promise(resolve=>setTimeout(resolve,500));}
 if(!ready)throw new Error('Preview server timed out.');
 await run('scripts/verify-demos.mjs');await run('scripts/verify-interactions.mjs');await run('scripts/verify-refinements.mjs');await run('scripts/verify-orrery.mjs');await run('scripts/verify-motion-exhibits.mjs');
}finally{server.kill('SIGTERM');}

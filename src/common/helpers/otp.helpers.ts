
export default function generateOTP(){
    return Math.floor(Math.random()*9999+10000).toString();
}
import Header from "../components/header";
import {Footer} from "../components/Footer";
import {Container} from "../components/Container";


import admin from "../utils/admin";

console.log(admin.initializeApp().name);
console.log(admin.initializeApp().auth().getUser("fYEHnHSzc3UHm22Lo6zKbfzRLs12"));


const Index = () => (
    <>
        <Header/>
        <Footer/>
    </>
);


export default Index;
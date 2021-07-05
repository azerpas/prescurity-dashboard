// react
import React , { useState } from "react";

// chakra
import { Button } from "@chakra-ui/button";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"



// blockchain
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { getSelectedAddress } from "../../utils/web3";

// components

import lastPatients from "./lastPatients" ;
import lastPrescriptions from "./lastPrescriptions" ;

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {

    const [patientAddress, setPatientAddress] = useState(null)
    const [pharmacistAddress, setPharmacistAddress] = useState(null)




    // TODO: Fonctions pour communiquer avec la blockchain

    

   

    


    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=170%3A9169

    return(
        <>

            <Tabs>
                <TabList>
                    <Tab>Dernières prescriptions</Tab>
                    <Tab>Derniers patients</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <lastPatients />
                        
                    </TabPanel>
                    <TabPanel>
                        <lastPrescriptions />
                        
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Button>generate a prescription</Button> // TO DO : lien vers le composant addPrescription

            
        </>
        
    )
}

export default Index;


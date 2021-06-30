import React from "react";
import { useState } from "react";
import { Container, Button, Input, Text } from "@chakra-ui/react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { getSelectedAddress } from "../../utils/web3";
import Header from "../header";

const Index = ({web, contrat}: {web: Web3, contrat: Contract}) => {
    // TODO: Fonctions pour communiquer avec la blockchain
    // https://www.figma.com/file/JfmVykHVYvBuqpZ6u6AE7q/?node-id=170%3A9169
    return(
        <>
            <ul>
                {/** TODO: Éléments graphiques à ajouter */}
                <li>Consulter les X dernières prescriptions</li>
                <li>Consulter les X dernières patients</li>
                <li>Bouton pour générer une prescription</li>
            </ul>
        </>
    )
}

export default Index;
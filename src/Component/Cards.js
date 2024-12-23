import React,{useState,useEffect} from "react";
import Card from "./Card";
// import './Card.css';
import Cards_Data from "../Data";
import UserAccess from "../UserAccess";
import { useNavigate } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { config, msalInstance } from "../config";



function Cards(props) {

    const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const AccessFilteredCards = Cards_Data
    .filter((item) => {
        var usr= UserAccess.find(user=> user.email.toLowerCase()==username.toLowerCase());

        return usr ? usr.pagesid.includes(item.id) : false;
    })

    const categoryFilteredCards =  AccessFilteredCards.filter((item) =>
        props.category=="All"?true: props.category==item.category
);

    const serachFilteredCards = categoryFilteredCards.filter((item) =>
        item.title.toLowerCase().includes(props.searchText.toLowerCase())
      );

   


    useEffect(() => {
        const initializeMsal = async () => {
            try {
                await msalInstance.initialize();
                setIsInitialized(true); // Mark as initialized
                const accounts = msalInstance.getAllAccounts();
                if (accounts && accounts.length > 0) {
                    setIsAuthenticated(true);
                    fetchUserDetails();
                }
            } catch (error) {
                console.error('MSAL initialization failed:', error);
            }
        };
        initializeMsal();
    }, []);

    // user detail
    const fetchUserDetails = async () => {
        try {
            const account = msalInstance.getAllAccounts()[0]; // Get the first account
            setUsername(account.username); // username

        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                msalInstance.acquireTokenPopup({
                    scopes: ['user.read']
                }).then((response) => {
                    setUsername(response.account.name);
                }).catch((error) => {
                    setError('Failed to fetch user details');
                });
            } else {
                setError('Failed to fetch user details');
            }
        }
    };



    return (
        <div className="z-0">
            
            <div className="card-all z-0 ">


                {serachFilteredCards.length > 0 ? (
            serachFilteredCards.map((item) => <Card key={item.id} val={item} />)) 
            : (
            <p className="text-gray-500">No widgets found.</p>
          )}
            </div>

        </div>

    );

}

export default Cards;
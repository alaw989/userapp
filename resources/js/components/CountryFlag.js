import React, { Component, useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';

function CountryFlag() {
    const [country, setCountry] = useState({
        country: "",
        alpha2code: ""
    });

    const [loading, setLoading] = useState(false);

    const [allCountries, setCountries] = useState({
        allCountries: []
    });

    useEffect(() => {
        setLoading(true);
        const proxy_url = "https://cors-anywhere.herokuapp.com/";
        const url = "https://restcountries.eu/rest/v2/all";
        const currentDate = new Date();

        axios
            .get("/api/user")
            .then(response => {
                const dateofBirth = response.data.dateofbirth.slice(6);
                const age = currentDate.getFullYear() - dateofBirth;

                setCountry({
                    country: response.data.country
                });
                return axios.get(proxy_url + url);
            })
            .then(response => {
                setCountries({
                    allCountries: response.data
                });
            });
    }, []);

    const entries = Object.values(allCountries);

    for (const entry of entries) {
        entry.map(x => {
            //   console.log("user country:", country.country);
            //    console.log("all listed:", x.alpha2Code);

            if (x.alpha2Code && x.alpha2Code == country.country) {
                console.log("success:", x.alpha2Code);
                setCountry({
                    alpha2code: x.alpha2Code
                });

                setLoading(false);
            }
        });
    }

    const flagSrc =
        "https://www.countryflags.io/" + country.alpha2code + "/flat/32.png";

    return (
        <div className="flag-container">
            {loading ? (
                <div>
                    {" "}
                    <ClipLoader sizeUnit={"px"} size={25} color={"#fff"} />
                </div>
            ) : (
                <img src={flagSrc}></img>
            )}
        </div>
    );
}

export default CountryFlag;

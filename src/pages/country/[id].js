import { useEffect, useLayoutEffect } from "react";
import styles from "./Country.module.css";

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

    const country= await res.json();
    return country;
}
const Country = ({country}) => {

    const {borders, setBorders} = useState([]);

    const getBorders = async () => {
        const borders = await Promise.all(country.borders.map(border => getCountry(border)));

        setBorders(borders);
    }

    useEffect(() => {
        getBorders();

    }, []);

    console.log(country);
   
    return <Layout title={ country.name}>
        <div className={Styles.container}>
            <div className={Styles.container_left}><div className={Styles.overview_panel}>
                <img src={country.flag} alt={country.name}></img>
                <h1 className={Styles.overview_name}>{country.name}</h1>
                <div className={Styles.overview_region}>{country.region}</div>

                <div className={Styles.overview_numbers}>
                    <div className={Styles.overview_population} >     
                    <div className={Styles.overview_value}>{country.population}</div>
                    <div className={Styles.overview_label}>Population</div>
                    </div>

                    <div className={Styles.overview_area}>
                    <div className={Styles.overview_value}>{country.area}</div>
                    <div className={Styles.overview_label}>Area</div>
                    </div>
                </div></div>
            <div  className={Styles.container_right}> <div className={styles.details_panel}>
                <h4 className={styles.details_panel_heading}>
                    Details
                </h4>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Capital</div>
                    <div className={styles.details_panel_value}>{country.capital}</div>
                </div>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Languages</div>
                    <div className={styles.details_panel_value}>{country.languages.map(({name}) => name).join(",")}</div>
                </div>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Currencies</div>
                    <div className={styles.details_panel_value}>{country.currencies.map(({name}) =>name).join(",")}</div>
                </div>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Native Name</div>
                    <div className={styles.details_panel_value}>
                        {country.nativeName}</div>
                </div>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Gini</div>
                    <div className={styles.details_panel_value}>{country.gini}%</div>
                </div>

                <div className={styles.details_panel_borders}>
                <div className={styles.details_panel_borders_label}>    Neighbouring Countries</div>

                <div className={styles.details_panel_borders_container}>

                {borders.map(({flag,name}) =>(
                    <div className={styles.details_panel_borders_country}>
                        <img src={flag} alt={name}></img>

                        <div className={styles.details_panel_borders_name}>{name}</div>
                    </div> ))} 
                      </div>
                    
                 
                </div>
            </div></div>
            
            </div>
           
        </div>
    </Layout>
};

export default Country;
export const getStaticPaths = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();

    const paths = countries.map((country) => ({
        params: {id: country.alpha3code},
    }));
    return{
        paths,
        fallback: false,
    }
}
 
export const getStaticProps = async(params) =>{

    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`);

    const country= await getCountry(params.id); 

    return {
        props:{
            country,
        },
    };
};







   



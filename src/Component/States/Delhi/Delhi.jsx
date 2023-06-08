/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Delhi.css";

const Delhipage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/delhi"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/cmsuploads/compressed/5621259188_e74d63cb05_b_20180302140149.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>India Gate</h2>
            <p>
              

The All India War Memorial, popularly known as the India Gate, is located along the Rajpath in New Delhi. The imposing structure of India Gate is an awe-inspiring sight and is often compared to the Arch de Triomphe in France, the Gateway of India in Mumbai and the Arch of Constantine in Rome. This 42-meter tall historical structure was designed by Sir Edwin Lutyens and is one of the largest war memorials in the country. India Gate is also famous for hosting the Republic Day Parade every year. 

Dedicated to 82,000 Indian and British soldiers who died during the First World War and the Third Anglo-Afghan War, this monument has the names of 13,300 servicemen inscribed on its surface. The premises of India Gate also houses the Amar Jawan Jyoti, which is a kindled structure right underneath the archway. Owing to its rich historical background and astonishing architecture, India Gate has become one of the most popular picnic spots in the city.

            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Akshardham Temple</h2>
            <p>
            An epitome of Indian culture, spirituality, and architecture, Akshardham Temple is a famous Hindu temple and a spiritual-cultural complex. Also known as Swaminarayan Akshardham, it is dedicated to Lord Swaminarayan. Akshardham has made its way to the Guinness Book of World Records as the World's Largest Comprehensive Hindu Temple.

The Akshardham Temple is known for its stunning architecture. It has eight ostentatiously carved mandapams while timeless Hindu teachings and flamboyant devotional traditions find their place on the temple's walls. The centrepiece, i.e. Lord Swaminarayan's Murti along with that of 20,000 deities, significant personalities in Indian history and sages showcase the essence of Indian architecture, traditions and timeless spiritual thoughts. 
            </p>
          </div>
          <div className="image">
            <img
              src="https://holidify.com/images/attr_wiki/compressed/attr_wiki_4067.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/cmsuploads/compressed/Qutub_Minar_in_the_monsoons_20170908115259.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Qutub Minar</h2>
            <p>Qutub Minar is a minaret or a victory tower located in Qutub complex, a UNESCO World Heritage Site in Delhi's Mehrauli area. With the height of 72.5 metres (238 ft), Qutub Minar is the second tallest monument of Delhi. Its construction was started in 1192 by Qutb Ud-Din-Aibak, founder of Delhi Sultanate after he defeated the last Hindu Ruler of Delhi. He constructed the basement, after which the construction was taken over by his son-in-law and successor Iltutmish who constructed three additional stories. The fourth and fifth storeys were built by Firoz Shah Tuglak. </p>
          </div>
        </div>
      </div>
    );
};

export default Delhipage;

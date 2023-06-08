/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Uttarpradesh.css";

const Uttarpradeshpage = () => {
  const location = useLocation();
  if (location.pathname !== "/state/uttarpradesh"){
    return null
  }
    return (
      <div>
        <div className="image-text-container">
          <div className="image">
            <img
              src="https://www.holidify.com/images/bgImages/AGRA.jpg"
              alt="Image 1"
            />
          </div>
          <div className="text">
            <h2>Taj Mahal</h2>
            <p>
              

Taj mahal Located on the banks of River Yamuna in Uttar Pradesh, Agra is a popular tourist destination as it is home to one of the 7 wonders of the world, the Taj Mahal. It is a sneak peek into the architectural history and legacy of the Mughal empire with two other UNESCO World Heritage Sites Agra Fort and Fatehpur Sikri. History, architecture, romance all together create the magic of Agra, and hence, makes for a must-visit for anyone living in or visiting India.


            </p>
          </div>
        </div>

        <div className="image-text-container">
          <div className="text">
            <h2>Dashwamedha Ghat (Varanasi)</h2>
            <p>
            Dashashwamedh Ghat is one of the most significant and oldest riverfront ghats located on the banks of the Ganges River in Varanasi, India. It is a sacred and bustling ghat where Hindu rituals and ceremonies take place daily. The ghat is known for its grand evening Aarti (prayer ceremony), which attracts a large number of devotees and tourists. It is believed that Lord Brahma performed the ten-horse sacrifice (Dashashwamedh) at this ghat, hence its name. Dashashwamedh Ghat is not only a religious site but also a vibrant and culturally rich place that showcases the spiritual essence of Varanasi.
            </p>
          </div>
          <div className="image">
            <img
              src="https://www.holidify.com/images/cmsuploads/compressed/Dashawamedha_Ghat_in_Varanasi_2_20190806135418.jpg"
              alt="Image 2"
            />
          </div>
        </div>

        <div className="image-text-container">
          <div className="image">
            <img src="https://www.holidify.com/images/bgImages/LUCKNOW.jpg" alt="Image 3" />
          </div>
          <div className="text">
            <h2>Lucknow</h2>
            <p>

The capital and the largest city of Uttar Pradesh, Lucknow, situated on the banks of river Gomti, welcomes you with a heartwarming note of "Muskuraiyein, kyunki aap Lucknow mein hai". A city of kebabs and nawabs, of architecture and history, of literature and culture – that is Lucknow in a nutshell for you. From a slice of rich colonial history to modernized museums, this artistic hub of Awadh region beautifully brings together the opulence of a glittering past and the simplicity of a modern city.

 
</p>
          </div>
        </div>
      </div>
    );
};

export default Uttarpradeshpage;

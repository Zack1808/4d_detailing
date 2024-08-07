import { useEffect, useState } from "react";

import { CategoryDisplayer, Header } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const imagesToLoad = [
  "/hero-bg-small.webp",
  "https://images.unsplash.com/photo-1689182360215-8b124a5b21be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1565689876697-e467b6c54da2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1581066057498-034b1cf15385?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const categories = [
  {
    title: "Vanjsko pranje",
    imgUrl:
      "https://images.unsplash.com/photo-1689182360215-8b124a5b21be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem totam magnam quo quae dignissimos, quis iusto, voluptate corrupti quidem molestias asperiores praesentium in rerum eum, vero quas dicta quod harum vitae. Cumque vitae reiciendis laboriosam sint alias animi consequatur necessitatibus non magnam! Quos earum ab quisquam cupiditate sapiente laudantium illum dolorum nemo non, hic numquam dicta aut reprehenderit perferendis in ipsa ut optio id necessitatibus iste. Reprehenderit eos nobis pariatur consectetur qui optio nemo! Obcaecati necessitatibus velit laboriosam voluptatibus est unde facilis cupiditate mollitia exercitationem ut. Voluptatem sit deleniti dignissimos explicabo, asperiores eveniet molestias eaque doloribus esse, nobis atque accusamus nisi reiciendis illum consequatur quidem sunt consequuntur labore quisquam sequi nihil fugit. Praesentium eum quia id sapiente corrupti necessitatibus alias minima dolorum quaerat deserunt ipsum beatae totam delectus perferendis veritatis ab, possimus enim laudantium sunt dolores assumenda! Amet iusto omnis suscipit! Ducimus cum exercitationem voluptates minima nesciunt commodi reprehenderit facilis repellat, iusto accusantium nemo dicta ex voluptatem aspernatur est. Vero, porro atque? Eligendi molestias iste consequatur incidunt quo suscipit libero soluta minima. Ut vero doloremque in maxime unde dolore itaque quo quibusdam perspiciatis exercitationem, praesentium non labore ea placeat quia, odit veniam, eos laborum tempora incidunt. Corporis sint deleniti quisquam, blanditiis ab nihil vel saepe? At asperiores quod illo dolore molestiae neque, incidunt laborum ipsum expedita laboriosam harum suscipit sequi excepturi, corrupti exercitationem consectetur ad, eius possimus cupiditate impedit ipsa. Nulla, deleniti quam eos, exercitationem voluptas, vel qui eveniet reprehenderit illo veniam similique accusamus sequi ipsam ab. Incidunt, molestiae sit?",
  },
  {
    title: "Vanjsko pranje s naplatcima",
    imgUrl:
      "https://images.unsplash.com/photo-1565689876697-e467b6c54da2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem totam magnam quo quae dignissimos, quis iusto, voluptate corrupti quidem molestias asperiores praesentium in rerum eum, vero quas dicta quod harum vitae. Cumque vitae reiciendis laboriosam sint alias animi consequatur necessitatibus non magnam! Quos earum ab quisquam cupiditate sapiente laudantium illum dolorum nemo non, hic numquam dicta aut reprehenderit perferendis in ipsa ut optio id necessitatibus iste. Reprehenderit eos nobis pariatur consectetur qui optio nemo! Obcaecati necessitatibus velit laboriosam voluptatibus est unde facilis cupiditate mollitia exercitationem ut. Voluptatem sit deleniti dignissimos explicabo, asperiores eveniet molestias eaque doloribus esse, nobis atque accusamus nisi reiciendis illum consequatur quidem sunt consequuntur labore quisquam sequi nihil fugit. Praesentium eum quia id sapiente corrupti necessitatibus alias minima dolorum quaerat deserunt ipsum beatae totam delectus perferendis veritatis ab, possimus enim laudantium sunt dolores assumenda! Amet iusto omnis suscipit! Ducimus cum exercitationem voluptates minima nesciunt commodi reprehenderit facilis repellat, iusto accusantium nemo dicta ex voluptatem aspernatur est. Vero, porro atque? Eligendi molestias iste consequatur incidunt quo suscipit libero soluta minima. Ut vero doloremque in maxime unde dolore itaque quo quibusdam perspiciatis exercitationem, praesentium non labore ea placeat quia, odit veniam, eos laborum tempora incidunt. Corporis sint deleniti quisquam, blanditiis ab nihil vel saepe? At asperiores quod illo dolore molestiae neque, incidunt laborum ipsum expedita laboriosam harum suscipit sequi excepturi, corrupti exercitationem consectetur ad, eius possimus cupiditate impedit ipsa. Nulla, deleniti quam eos, exercitationem voluptas, vel qui eveniet reprehenderit illo veniam similique accusamus sequi ipsam ab. Incidunt, molestiae sit?",
  },
  {
    title: "Premium čišćenje vozila",
    imgUrl:
      "https://images.unsplash.com/photo-1581066057498-034b1cf15385?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem totam magnam quo quae dignissimos, quis iusto, voluptate corrupti quidem molestias asperiores praesentium in rerum eum, vero quas dicta quod harum vitae. Cumque vitae reiciendis laboriosam sint alias animi consequatur necessitatibus non magnam! Quos earum ab quisquam cupiditate sapiente laudantium illum dolorum nemo non, hic numquam dicta aut reprehenderit perferendis in ipsa ut optio id necessitatibus iste. Reprehenderit eos nobis pariatur consectetur qui optio nemo! Obcaecati necessitatibus velit laboriosam voluptatibus est unde facilis cupiditate mollitia exercitationem ut. Voluptatem sit deleniti dignissimos explicabo, asperiores eveniet molestias eaque doloribus esse, nobis atque accusamus nisi reiciendis illum consequatur quidem sunt consequuntur labore quisquam sequi nihil fugit. Praesentium eum quia id sapiente corrupti necessitatibus alias minima dolorum quaerat deserunt ipsum beatae totam delectus perferendis veritatis ab, possimus enim laudantium sunt dolores assumenda! Amet iusto omnis suscipit! Ducimus cum exercitationem voluptates minima nesciunt commodi reprehenderit facilis repellat, iusto accusantium nemo dicta ex voluptatem aspernatur est. Vero, porro atque? Eligendi molestias iste consequatur incidunt quo suscipit libero soluta minima. Ut vero doloremque in maxime unde dolore itaque quo quibusdam perspiciatis exercitationem, praesentium non labore ea placeat quia, odit veniam, eos laborum tempora incidunt. Corporis sint deleniti quisquam, blanditiis ab nihil vel saepe? At asperiores quod illo dolore molestiae neque, incidunt laborum ipsum expedita laboriosam harum suscipit sequi excepturi, corrupti exercitationem consectetur ad, eius possimus cupiditate impedit ipsa. Nulla, deleniti quam eos, exercitationem voluptas, vel qui eveniet reprehenderit illo veniam similique accusamus sequi ipsam ab. Incidunt, molestiae sit?",
  },
];

const Eksterijer = ({ onLoadingComplete, resetScroll }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleImageLoaded = () => {
      setImagesLoaded((prevState) => prevState + 1);
    };

    imagesToLoad.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = handleImageLoaded;
      img.onerror = handleImageLoaded;
    });

    resetScroll();
  }, []);

  useEffect(() => {
    if (imagesLoaded < imagesToLoad.length) return;

    onLoadingComplete();
  }, [imagesLoaded]);
  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <>
      <Header title="Čišćenje Eksterijera" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">
          <CategoryDisplayer
            categories={categories}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </>
  );
};

export default transition(Eksterijer);

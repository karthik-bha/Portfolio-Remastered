"use client";
import { useState } from "react";
import useInViewOnce from "@/context/context"
import { motion } from "framer-motion"
interface Certification {
  title: string;
  link: string;
  img: string;
}

const Certifications = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Open the modal and set the selected image
  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const certiList: Certification[] = [
    {
      title: "IBM Full Stack Developer",
      link: "https://www.coursera.org/account/accomplishments/professional-cert/CMU5VWJJZU95?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof",
      img: "/images/certificates/FS.png",
    },
    {
      title: "IBM Data Analyst",
      link: "https://coursera.org/share/8077e02d4d5855153e707747f5510372",
      img: "/images/certificates/DA.png",
    },
    {
      title: "IBM Data Science",
      link: "https://coursera.org/share/ec631601ed57c5a5655c7567b3c4a28f",
      img: "/images/certificates/DS.png",
    },
    {
      title: "Google Cloud Digital Leader",
      link: "https://www.credly.com/badges/a0625092-4083-46cb-9b9e-96396bccf8e9/public_url",
      img: "/images/certificates/CDL.png",
    },
    {
      title: "SmartBridge AI & ML",
      link: "https://drive.google.com/file/d/1qunn2YAJCD9GQdDWcudWKp1ZEDmrC4yF/view",
      img: "/images/certificates/SMBAIML.png",
    },
  ];
  const { ref, hasAnimated } = useInViewOnce(0.3);
  return (
    <section ref={ref} id="#certifications">
      <motion.h2 className="text-center md:text-left font-header text-section-header my-10"
        initial={{ opacity: 0, x: "-50px" }}
        animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}>Certifications</motion.h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // Delay each child animation
            },
          },
        }}
      >
        {certiList.map((item, index) => (
          <motion.div key={index} className="flex flex-col gap-2 items-center hover:text-white"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="rounded-lg h-[220px] w-full md:w-full object-cover
                transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={() => openModal(item.img)}
            />
            <h2 className="text-center">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#848484] hover:text-white">
                {item.title}
              </a>
            </h2>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="relative bg-white p-4 rounded-lg">
            <button onClick={closeModal} className="absolute top-0 right-0 text-xl p-2 bg-gray-300 rounded-full">
              &times;
            </button>
            <img src={selectedImage} alt="Selected" className="max-w-[90%] max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;

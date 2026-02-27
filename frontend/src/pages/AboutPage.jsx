import React from 'react';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

const AboutPage = () => {
  const values = [
    {
      icon: <FiTarget className="h-8 w-8 text-primary-600" />,
      title: 'Our Mission',
      description: 'To provide a seamless platform for technical event management, connecting vendors and customers efficiently.'
    },
    {
      icon: <FiEye className="h-8 w-8 text-primary-600" />,
      title: 'Our Vision',
      description: 'To become the leading platform for technical event management, known for innovation and reliability.'
    },
    {
      icon: <FiHeart className="h-8 w-8 text-primary-600" />,
      title: 'Our Values',
      description: 'Integrity, innovation, customer satisfaction, and continuous improvement in everything we do.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-xl opacity-90 max-w-2xl">
          We are dedicated to revolutionizing the way technical events are managed and experienced.
        </p>
      </section>

      {/* Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="inline-block p-3 bg-primary-50 rounded-full mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Founded in 2024, Technical Event Management started with a simple idea: to make event management easier and more efficient for everyone involved. What began as a small project has grown into a comprehensive platform serving hundreds of vendors and thousands of customers.
          </p>
          <p>
            Our platform bridges the gap between vendors and customers, providing a seamless experience for discovering, purchasing, and managing products. We believe in the power of technology to transform traditional event management into a modern, efficient process.
          </p>
          <p>
            Today, we continue to innovate and improve our platform, always keeping our users' needs at the forefront. We're proud of what we've built and excited about the future.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-8">Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're a dedicated team of professionals passionate about creating the best event management experience.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
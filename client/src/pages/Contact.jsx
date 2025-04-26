import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { assets } from "../assets/assets";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    
    try {
      // In a real app, you would send this to your backend
      // const { data } = await axios.post('/api/contact', formData);
      
      // For demo purposes, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store message in local state for display
      const newMessage = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleString()
      };
      
      setMessages(prev => [newMessage, ...prev]);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error(error.message || 'Error sending message');
    } finally {
      setLoading(false);
    }
  };

  const teamLeader = {
    name: 'Md Asif Ahmad',
    role: 'Project Lead',
    image: assets.asif,
    bio: 'Asif has knowledge of ReactJs for Frontend and expressJS and NodeJs for Backend development and led the GreenCart project from concept to completion.',
    email: 'asifrazakhan0123@gmail.com',
    linkedin: 'https://www.linkedin.com/in/asif26/'
  };

  const teamMembers = [
    {
      name: 'Lokesh parteti',
      role: 'Frontend Developer',
      image: assets.parteti,
      bio: 'Lokesh specializes in React and led the development of the user interface for GreenCart.',
      email: 'lokeshparteti057@gmail.com'
    },
    {
      name: 'Md Rahmat Ali',
      role: 'Database Developer',
      image: assets.rahmat,
      bio: 'Rahmat developed the database-side architecture and database integration for GreenCart.',
      email: 'rahmat9122397893@gmail.com'
    },
    {
      name: 'Nafish Haidar',
      role: 'Tester',
      image: assets.nafish,
      bio: 'Nafish created the user experience flow and designed the Testing elements of GreenCart.',
      email: 'haidernafish31327511@gmail.com'
    }
  ];

  return (
    <div className="mt-16 pb-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          The passionate individuals behind GrowCart who work tirelessly to bring fresh groceries to your doorstep.
        </p>
      </div>

      {/* Team Leader Section */}
      <div className="bg-primary/10 rounded-xl p-8 mb-16 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <img 
              src={teamLeader.image} 
              alt={teamLeader.name} 
              className="rounded-full w-48 h-48 object-cover mx-auto border-4 border-white shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800">{teamLeader.name}</h2>
            <p className="text-primary font-medium mb-4">{teamLeader.role}</p>
            <p className="text-gray-600 mb-6">{teamLeader.bio}</p>
            <div className="flex gap-4">
              <a href={`mailto:${teamLeader.email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {teamLeader.email}
              </a>
              <a href={teamLeader.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-80 flex items-center justify-center overflow-hidden bg-gray-50">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary transition text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-16">
        <div className="md:flex">
          <div className="md:w-1/2 bg-primary p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-6">We'd love to hear from you! Please fill out the form and our team will get back to you shortly.</p>
            
            <div className="flex items-start gap-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div>
                <h3 className="font-bold">Our Office</h3>
                <p className="text-white/80">123 Grocery Lane, Fresh City, FC 12345</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-white/80">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-white/80">support@growcart.com</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  type="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  type="text"
                  id="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  id="message"
                  rows="4"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dull transition duration-300 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Messages Section - Display submitted messages */}
      {messages.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Submitted Messages</h2>
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{msg.subject}</h3>
                    <p className="text-gray-600 text-sm">From: {msg.name} ({msg.email})</p>
                  </div>
                  <span className="text-xs text-gray-500">{msg.date}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{msg.message}</p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex">
                  <span className="text-green-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Message received successfully
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact; 
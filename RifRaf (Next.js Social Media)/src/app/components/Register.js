// Register.js
import React, { useState } from 'react';
import { registerUser } from '../api/register';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(Date);
  const [terms, setTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const profilesData = {
      Username: userName,
      Password: password,
      Email: email,
      Role: 'Standard'
    };

    const settingsData = {};
    const favoritesData = {};
    const repostData = {};
    const uploadData = {};
    const friendData = {};
    const followingData = {};

    const result = await registerUser(userName, profilesData, friendData, followingData, settingsData, favoritesData, repostData, uploadData);
    
    if (result.success) {
      alert('User registered successfully!');
    } else {
      alert('Registration failed, please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <div className='spacer' />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className='spacer' />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className='spacer' />
      DOB: 
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />
      <div className='spacer' />
      <div className='spacer' />
      You must review and agree to our <div style={{ color: 'blue', textDecoration: 'underline'}} onClick={() => setShowTerms(!showTerms)}>Terms and License Agreement </div> before you can register:
      <div className='spacer' />
      <input
        type="checkbox"
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        required
      />
      <div className='spacer' />
      <div className='spacer' />
      <button id="register-button" type="submit">Register</button>
      {showTerms && (
        <div className='policies' onClick={() => setShowTerms(!showTerms)}>
          <h2 style={{textAlign: 'center'}}>Terms and License Conditions</h2>
          <h5 style={{textAlign: 'center'}}>January 8th, 2025</h5>
          <div className='spacer'/>
          <h4>Introduction</h4>
          1.1 Purpose Statement: Welcome to RifRaf! Our Terms and Conditions establish the rules for using our services, promoting fairness and transparency in our digital community.
          <div className='spacer'/>
          1.2 Acceptance Clause: By using our platform, you agree to abide by the terms outlined in these Terms and Conditions. Your continued use implies your understanding and acceptance of these conditions.
          <h4>User Rights and Responsibilities</h4>
          2.1 User Conduct: Users are expected to engage in respectful and lawful behavior on our platform. Violations may lead to consequences outlined in Section 7, ensuring a positive and secure online environment.
          <div className='spacer'/>
          2.2 Account Security: Protecting your account is crucial. Users are responsible for maintaining the security of their accounts and passwords, contributing to the overall safety of our digital community.
          <h4>Service Description</h4>
          3.1 Overview of Services: At RifRaf, we provide a social media platform that includes a content engagement system. Stay informed about any changes through our Modifications Clause to have a seamless user experience.
          <div className='spacer'/>
          3.2 Modifications Clause: We reserve the right to modify or discontinue services for improvement. Users will be notified of significant changes, maintaining transparency and user awareness.
          <h4>Payment Terms</h4>
          4.1 Fee Structure: Users agree to pay the specified fees for our services. Payment methods accepted include credit or debit card only, ensuring a straightforward financial transaction process.
          <div className='spacer'/>
          4.2 Billing Policies: RifRaf has tools that are billed for on 30 day basis. Familiarize yourself with our billing policies to avoid disruptions and manage your financial commitment.
          <h4>Privacy Policy Integration</h4>
          5.1 Data Handling: We handle user data as outlined in our Privacy Policy, respecting user privacy and complying with data protection regulations.
          <div className='spacer'/>
          5.2 Cookies Usage: RifRaf does not collect any cache, cookies, or device inforamtion.
          <h4>Intellectual Property Rights</h4>
          6.1 Ownership Statement: RifRaf retains ownership of all intellectual property, ensuring a secure and innovative environment for our community.
          <div className='spacer'/>
          6.2 User Content Rights: Users grant RifRaf rights to use content they generate on our platform, striking a balance between user-generated content and platform interests.
          <h4>Termination and Suspension</h4>
          7.1 Grounds for Termination: RifRaf reserves the right to remove any creators or content that we deem to be inappropriate and it is at our discretion to determine this. If your content is removed or account is banned 
          you are relinquishing any right to appeal, or take legal action for the account or contents removal from our platform. We have a strict No Tolerace policy when it comes to sexually explicit content, drugs, or alcohol 
          use or promotion. Adhering to our community guidelines ensures a positive online environment for everyone.
          <div className='spacer'/>
          7.2 Consequences of Termination: Termination may result in automatic removal of your content or account, and in some severe cases RifRaf reserves the right to take legal actions. Compliance ensures uninterrupted access to our services and fosters a healthy online community.
          <div className='spacer'/>
          <div className='spacer'/>
          <div className='spacer'/>
          <h5>By using our services, you acknowledge that you have read and agreed to these Terms and License Conditions.</h5>
        </div>
      )}
    </form>
  );
}

export default Register;

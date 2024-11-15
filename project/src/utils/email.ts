interface EmailData {
  serviceType: string;
  vehicleType: string;
  detailingType: string;
  addOns: number[];
  date: string;
  time: string;
  email: string;
}

export const sendEmail = async (formData: EmailData) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      access_key: '8e63e7e3-ab53-43a9-80c5-ebc113c25912',
      subject: `New Car Detailing Booking - ${formData.vehicleType}`,
      from_name: formData.email,
      message: `
        Service Type: ${formData.serviceType}
        Vehicle Type: ${formData.vehicleType}
        Detailing Type: ${formData.detailingType}
        Add-ons: ${formData.addOns.join(', ')}
        Date: ${formData.date}
        Time: ${formData.time}
        Email: ${formData.email}
      `
    })
  });

  const data = await response.json();
  
  if (data.success) {
    return data;
  } else {
    throw new Error('Failed to send email. Please try again.');
  }
};
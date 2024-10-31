// Sum days in the last 180 days, grouped only by visa_type

const sumInDays = (visas, visa_name) => {
    const today = new Date();
    const todayMinus180 = new Date(today);
    todayMinus180.setDate(today.getDate() - 180);
  
    // Filter logs where the end date is within the last 180 days
    const filteredLogs = visas.filter(log => {
      const endDate = new Date(log.end_date);
      return endDate >= todayMinus180;
    });
  
    // Adjust start dates and calculate duration
    const adjustedLogs = filteredLogs.map(log => {
      const startDate = new Date(log.start_date);
      const adjustedStart = startDate < todayMinus180 ? todayMinus180 : startDate;
  
      // Calculate the valid days within the 180-day window
      const endDate = new Date(log.end_date);
      const duration = Math.floor((endDate - adjustedStart) / (1000 * 60 * 60 * 24) + 1);
  
      return { ...log, validDays: duration > 0 ? duration : 0 };
    });
  
    // Group by visa_type and sum valid days
    const daysByVisaType = adjustedLogs.reduce((acc, log) => {
      const { visa_name, validDays } = log;
      
      // Initialize the visa_type group if it doesn't exist
      acc[visa_name] = (acc[visa_name] || 0) + validDays;
      
      return acc;
    }, {});
  
    console.log("Total valid days by visa_type within 180 days:", daysByVisaType);
  }
  
  export default sumInDays;
//sum days in the last 180 days

  // Calculate today minus 180 days
    const sumInDays = (visas) => {
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
    
    // Sum valid days across all logs
    const totalValidDays = adjustedLogs.reduce((sum, log) => sum + log.validDays, 0);
    
    console.log("Total valid days within 180 days:", totalValidDays);

    
    }

    export default sumInDays;
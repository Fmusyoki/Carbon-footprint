

app.post('/addapplianceemission', async (req, res) => {
  try {
    const sessionData = {
      ...req.body,
      createdAt: new Date()
    };
    
    const result = await db.collection('energy_sessions').insertOne(sessionData);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving session' });
  }
});

//CHART
app.get('/energy-chart', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const sessions = await db.collection('energy_sessions')
      .find({ timestamp: { $gte: sevenDaysAgo.toISOString() } })
      .sort({ timestamp: 1 })
      .toArray();

    const chartData = sessions.reduce((acc, session) => {
      const date = new Date(session.timestamp).toLocaleDateString();
      const existing = acc.find(item => item.date === date);
      
      if (existing) {
        existing.emissions += session.emissions;
        existing.energy += session.energy;
      } else {
        acc.push({
          date,
          emissions: session.emissions,
          energy: session.energy
        });
      }
      
      return acc;
    }, []);

    res.status(200).json({ success: true, chartData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching chart data' });
  }
});

//DELETE
app.delete('/delenergy-sessions', async (req, res) => {
  try {
    await db.collection('energy_sessions').deleteMany({});
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error clearing sessions' });
  }
});
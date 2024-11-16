import React from "react";

const Appliances = () => {
  const [applianceList, setApplianceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applianceDetails, setApplianceDetails] = useState(-1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://repair-or-replace-back-end.onrender.com/api/appliances/"
      );
      const applianceData = await response.json();
      setApplianceList(applianceData);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewApplianceDetails = (appliance) => {
    setApplianceDetails(appliance);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(applianceList);
  return (
  <div>
    <h1 className="text-center">Your Appliances</h1>
    <Container>
      <ListGroup>
        {applianceList.map((appliance) => (
          <ListGroup.Item key={appliance.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="./../assets/default_home_pic.jpeg" />
              <Card.Body>
                <Card.Title>{appliance.name}</Card.Title>
                <Card.Text>{appliance.appliance_type}</Card.Text>
                <Card.Text>{appliance.brand}</Card.Text>
                <Card.Text>{appliance.model}</Card.Text>
                <Card.Text>{appliance.purchase_date}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>

  </div>
)
};

export default Appliances;

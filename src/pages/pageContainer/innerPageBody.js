
import React, { useEffect } from 'react';
import { Card, Dropdown, Col, Row, ProgressBar } from "react-bootstrap";
import PageHeader from '../pageContainer/header'
import { TbDots } from "react-icons/tb";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { getCountry, getRegDashboard } from './action';
Chart.register(CategoryScale);

const PageContainer = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegDashboard())
    dispatch(getCountry())
  }, [])
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Women",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        redraw :true,
        // backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Men",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        redraw :true,
        borderColor: "#742774"
      }
    ]
  };

  
  return (
    <div className="inner-page">
      <PageHeader/>
        <div className='dashboardPageUI'>
          <Row>
          <Col md="4" sm="12">
            <Card className='gridCard'>
              <Card.Header>
                <Card.Title>Total Users</Card.Title>
                <Dropdown align="end" >
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    <TbDots/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1" active>
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>       
              <Card.Body>   
                <Card.Subtitle >271K people</Card.Subtitle>
                <Card.Text>
                  + 4,2% <img src="/images/upArrow.svg" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className='gridCard'>
              <Card.Header>
                <Card.Title>New Users</Card.Title>
                <Dropdown align="end" >
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    <TbDots/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1" active>
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>       
              <Card.Body>   
                <Card.Subtitle >6 299 people</Card.Subtitle>
                <Card.Text>
                - 5,1% <img src="/images/downArrow.svg" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className='gridCard'>
              <Card.Header>
                <Card.Title>Deactivated Users</Card.Title>
                <Dropdown align="end" >
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    <TbDots/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1" active>
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>       
              <Card.Body>   
                <Card.Subtitle >2 088 people</Card.Subtitle>
                <Card.Text>
                + 1.5% <img src="/images/upArrow.svg" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="8" sm="12">
            <Card className='gridCard'>
              <Card.Header>
                <Card.Title> Registration Completed  </Card.Title>
                <Dropdown align="end" className='graphFilter'>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    20/07/2021 – 26/07/2021
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1" active>
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>       
              <Card.Body>
                {/* chart */}
                <Line data={data} />
                {/* chart end */}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className='gridCard'>
              <Card.Header>
                <Card.Title> Geo  </Card.Title>
                <Card.Link> Country </Card.Link>
                <Card.Link> City </Card.Link>
                
                <Dropdown align="end" >
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    <TbDots/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-2">Female Date Location</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Male Geolocation</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </Card.Header>       
              <Card.Body >   
                <Row className='w-100'>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Toronto <span>94%</span> </h6> 
                    <ProgressBar now={60} />
                  </Col>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Alberta <span>10%</span> </h6> 
                    <ProgressBar now={10} />
                  </Col>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Manitoba <span>0,20%</span> </h6> 
                    <ProgressBar now={2} />
                  </Col>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Halifax <span>0,20%</span> </h6> 
                    <ProgressBar now={2} />
                  </Col>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Ontario <span> 0,13% </span> </h6> 
                    <ProgressBar now={2} />
                  </Col>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Regina <span>0,73%</span> </h6> 
                    <ProgressBar now={7} />
                  </Col>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Yukon <span>0,20% </span> </h6> 
                    <ProgressBar now={2} />
                  </Col>
                  <Col md="6" className='mb-4 progressBarBox'>
                    <h6> Other <span> 1,37% </span> </h6> 
                    <ProgressBar now={13} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div>
    </div>
  )
}
export default PageContainer;
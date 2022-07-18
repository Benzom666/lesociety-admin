
import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Col, Row, ProgressBar } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import PageHeader from '../pageContainer/header'
import { TbDots } from "react-icons/tb";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from "react-redux";
import {CategoryScale} from 'chart.js'; 
import { getCountry, getGeoStats, getRegDashboard, getRegDashboardMale, getUnRegDashboard, getUnRegDashboardMale } from './action';
import moment from 'moment';
Chart.register(CategoryScale);

const PageContainer = props => {
  const { registerCompFemaleList, registerCompMaleList, registerUnCompFemaleList, registerUnCompMaleList } = useSelector(
    (state) => state.userListReducer
  );
  const dispatch = useDispatch();
  const [regComp, setRegComp] = useState(moment().subtract(30, 'days'));
  const [inRegComp, setInRegComp] = useState(new Date());
  useEffect(() => {
    dispatch(getRegDashboard(regComp))
    dispatch(getRegDashboardMale(regComp))
    dispatch(getUnRegDashboard(regComp))
    dispatch(getUnRegDashboardMale(regComp))
    dispatch(getCountry())
    dispatch(getGeoStats())
  }, [])
  const data = {
    labels: 
      !!registerCompFemaleList && registerCompFemaleList.map((value) => 
      [moment(value?.created_at).format('DD/MM')]
      )
    ,
    datasets: [
      {
        label: "Women",
        data: 
        [!!registerCompFemaleList && registerCompFemaleList.map((value) => 
        value?.count.toString()
        )],
        fill: true,
        redraw :true,
        // backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Men",
        data: !!registerCompMaleList && registerCompMaleList.map((value) => 
        [value?.count]
        ),
        fill: false,
        redraw :true,
        borderColor: "#742774"
      }
    ]
  };
  console.log("data==>", data)
  const unCompdata = {
    labels: 
      !!registerUnCompFemaleList && registerUnCompFemaleList.map((value) => 
      [moment(value?.created_at).format('DD/MM')]
      )
    ,
    datasets: [
      {
        label: "Women",
        data: !!registerUnCompFemaleList && registerUnCompFemaleList.map((value) => 
        [value?.count]
        ),
        fill: true,
        redraw :true,
        // backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Men",
        data: !!registerUnCompMaleList && registerUnCompMaleList.map((value) => 
        [value?.count]
        ),
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
                  <DateTimePicker 
                    onChange={(e) => setRegComp(e)} 
                    value={regComp} 
                    calendarClassName="graphFilter" 
                    disableClock="false"
                  />
              </Card.Header>       
              <Card.Body>
                <Line data={data} />
              </Card.Body>
            </Card>
            {/* end section */}
            <Card className='gridCard'>
              <Card.Header>
                <Card.Title> Registration Uncompleted  </Card.Title>
                <DateTimePicker 
                    onChange={(e) => setInRegComp(e)} 
                    value={inRegComp} 
                    calendarClassName="graphFilter" 
                    disableClock="false"
                  />
              </Card.Header>       
              <Card.Body>
                <Line data={unCompdata} />
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
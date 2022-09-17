import React, { useEffect, useState } from "react";
import { Card, Dropdown, Col, Row, ProgressBar } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import PageHeader from "../pageContainer/header";
import { TbDots } from "react-icons/tb";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { CategoryScale } from "chart.js";
import {
  getCountry,
  getDashboardStats,
  getDashboardStatsDeactive,
  getDashboardStatsNew,
  getGeoStats,
  getRegDashboard,
  getRegDashboardMale,
  getUnRegDashboard,
  getUnRegDashboardMale,
} from "./action";
import moment from "moment";
import Utils from "../../utility";
Chart.register(CategoryScale);

const PageContainer = (props) => {
  const {
    registerCompFemaleList,
    registerCompMaleList,
    registerUnCompFemaleList,
    registerUnCompMaleList,
    geoStats,
    dashboardStats,
    dashboardStatsNew,
    dashboardStatsDeactive,
    rEndDate,
    rStartDate,
    unRstartDate,
    unRendDate,
  } = useSelector((state) => state.userListReducer);
  console.log("rStartDate", rStartDate, rEndDate);
  const dispatch = useDispatch();
  const [regComp, setRegComp] = useState(moment().subtract(7, "days"));
  // const [regCompStrt, setRegCompStrt] = useState(new Date());
  // const [regCompEnd, setRegCompEnd] = useState(new Date());
  const [inRegComp, setInRegComp] = useState(new Date());
  const [inRegCompEnd, setInRegCompEnd] = useState(new Date());
  // console.log("regCompStrtregCompStrtregCompStrt", regCompStrt)
  useEffect(() => {
    dispatch(getRegDashboard());
    dispatch(getRegDashboardMale());
    dispatch(getUnRegDashboard());
    dispatch(getUnRegDashboardMale());
    dispatch(getCountry());
    dispatch(getGeoStats());
    dispatch(getDashboardStats());
    dispatch(getDashboardStatsNew(5));
    dispatch(getDashboardStatsDeactive(4));
  }, []);
  const data = {
    labels:
      !!registerCompFemaleList &&
      registerCompFemaleList.map((value) => [
        moment(value?.created_at).format("DD/MM"),
      ]),
    datasets: [
      {
        label: "Women",
        data:
          !!registerCompFemaleList &&
          registerCompFemaleList.map((value) => value?.count),
        fill: false,
        backgroundColor: "rgb(242 68 98 / 22%)",
        borderColor: "#f24462",
        tension: 0.5,
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
      {
        label: "Men",
        data:
          !!registerCompMaleList &&
          registerCompMaleList.map((value) => value?.count),
        fill: true,
        borderColor: "#618CB4",
        tension: 0.5,
        backgroundColor: "rgb(93 137 179 / 25%)",
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
    ],
  };
  const unCompdata = {
    labels:
      !!registerUnCompFemaleList &&
      registerUnCompFemaleList.map((value) => [
        moment(value?.created_at).format("DD/MM"),
      ]),
    datasets: [
      {
        label: "Women",
        data:
          !!registerUnCompFemaleList &&
          registerUnCompFemaleList.map((value) => value?.count),
        fill: false,
        redraw: true,
        backgroundColor: "rgb(242 68 98 / 22%)",
        borderColor: "#f24462",
        tension: 0.5,
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
      {
        label: "Men",
        data:
          !!registerUnCompMaleList &&
          registerUnCompMaleList.map((value) => value?.count),
        fill: true,
        redraw: true,
        borderColor: "#618CB4",
        tension: 0.5,
        backgroundColor: "rgb(93 137 179 / 25%)",
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="inner-page">
      <PageHeader title="Dashboard" />
      <div className="dashboardPageUI">
        <Row>
          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title>Total Users</Card.Title>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    <TbDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStats(
                            moment().subtract(1, "d").format(),
                            moment().format()
                          )
                        );
                      }}
                    >
                      Past Day
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStats(
                            moment().subtract(7, "d").format(),
                            moment().format()
                          )
                        );
                      }}
                    >
                      Past Week
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStats(
                            moment().subtract(1, "months").format(),
                            moment().format()
                          )
                        );
                      }}
                    >
                      Past Month
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStats(
                            moment().subtract(1, "years").format(),
                            moment().format()
                          )
                        );
                      }}
                    >
                      Past Year
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>
                  {!!dashboardStats && dashboardStats[0]?.count} people
                </Card.Subtitle>
                <Card.Text>
                  {!!dashboardStats && dashboardStats[0]?.percent}{" "}
                  <img src="/images/upArrow.svg" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title>New Users</Card.Title>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    <TbDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsNew(
                            5,
                            moment().subtract(1, "d").format()
                          )
                        );
                      }}
                    >
                      Past Day
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsNew(
                            5,
                            moment().subtract(7, "d").format()
                          )
                        );
                      }}
                    >
                      Past Week
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsNew(
                            5,
                            moment().subtract(1, "months").format()
                          )
                        );
                      }}
                    >
                      Past Month
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsNew(
                            5,
                            moment().subtract(1, "years").format()
                          )
                        );
                      }}
                    >
                      Past Year
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>
                  {!!dashboardStatsNew && dashboardStatsNew[0]?.count} people
                </Card.Subtitle>
                <Card.Text>
                  {!!dashboardStatsNew && dashboardStatsNew[0]?.percent}{" "}
                  <img src="/images/downArrow.svg" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title>Deactivated Users</Card.Title>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    <TbDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsDeactive(
                            4,
                            moment().subtract(1, "d").format()
                          )
                        );
                      }}
                    >
                      Past Day
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsDeactive(
                            4,
                            moment().subtract(7, "d").format()
                          )
                        );
                      }}
                    >
                      Past Week
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsDeactive(
                            4,
                            moment().subtract(1, "months").format()
                          )
                        );
                      }}
                    >
                      Past Month
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(
                          getDashboardStatsDeactive(
                            4,
                            moment().subtract(1, "years").format()
                          )
                        );
                      }}
                    >
                      Past Year
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>
                  {!!dashboardStatsDeactive && dashboardStatsDeactive[0]?.count}{" "}
                  people
                </Card.Subtitle>
                <Card.Text>
                  {!!dashboardStatsDeactive &&
                    dashboardStatsDeactive[0]?.percent}{" "}
                  <img src="/images/upArrow.svg" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="8" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Row className="w-100">
                  <Col md="8">
                    <Card.Title> Registration Completed </Card.Title>
                  </Col>
                  <Col md="4" className="clandr-date">
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGCOMPFEMALE,
                          type: Utils.ActionName.GET_REGCOMPMALE,
                          payload: { rStartDate: e },
                        });
                        dispatch(getRegDashboard("", rStartDate, rEndDate));
                        dispatch(getRegDashboardMale("", rStartDate, rEndDate));
                      }}
                      value={rStartDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                      minDetail="decade"
                    />
                    <span className="dategap"> - </span>
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGCOMPFEMALE,
                          type: Utils.ActionName.GET_REGCOMPMALE,
                          payload: { rEndDate: e },
                        });
                        dispatch(getRegDashboard("", rStartDate, rEndDate));
                        dispatch(getRegDashboardMale("", rStartDate, rEndDate));
                      }}
                      value={rEndDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                    />
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Line data={data} />
              </Card.Body>
            </Card>
            {/* end section */}
            <Card className="gridCard">
              <Card.Header>
                <Row className="w-100">
                  <Col md="8">
                    <Card.Title> Registration Uncompleted </Card.Title>
                  </Col>
                  <Col md="4" className="clandr-date">
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGUNCOMPFEMALE,
                          type: Utils.ActionName.GET_REGUNCOMPMALE,
                          payload: { unRstartDate: e },
                        });
                        dispatch(
                          getUnRegDashboard("", unRstartDate, unRendDate)
                        );
                        dispatch(
                          getUnRegDashboardMale("", unRstartDate, unRendDate)
                        );
                      }}
                      value={unRstartDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                    />
                    <span className="dategap"> - </span>
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGUNCOMPFEMALE,
                          type: Utils.ActionName.GET_REGUNCOMPMALE,
                          payload: { unRendDate: e },
                        });
                        dispatch(
                          getUnRegDashboard("", unRstartDate, unRendDate)
                        );
                        dispatch(
                          getUnRegDashboardMale("", unRstartDate, unRendDate)
                        );
                      }}
                      value={unRendDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                    />
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Line data={unCompdata} />
              </Card.Body>
            </Card>
          </Col>

          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title> Geo </Card.Title>
                <Card.Link
                  onClick={() => {
                    dispatch(getGeoStats());
                  }}
                >
                  {" "}
                  Country{" "}
                </Card.Link>
                <Card.Link onClick={() => {}}> City </Card.Link>

                <Dropdown align="end">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    <TbDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(getGeoStats("", "", "female"));
                      }}
                    >
                      Female Date Location
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(getGeoStats("", "", "male"));
                      }}
                    >
                      Male Geolocation
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Row className="w-100">
                  {geoStats.length > 0
                    ? geoStats.map((value, index) => {
                        return (
                          <Col
                            md="6"
                            className="mb-4 progressBarBox"
                            onClick={() => {
                              dispatch(getGeoStats("city", value?.location));
                            }}
                          >
                            <h6>
                              {" "}
                              {value?.location
                                ? value?.location
                                : "Country Name"}{" "}
                              <span>{value?.totalCount}%</span>{" "}
                            </h6>
                            <ProgressBar now={value?.totalCount} />
                          </Col>
                        );
                      })
                    : "Record Not Found."}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PageContainer;

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
import { set } from "lodash";
Chart.register(CategoryScale);

const PageContainer = (props) => {
  const [geoData, setGeoData] = useState({
    place: "",
    gender: "",
    locationType: "country",
  });
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegDashboard());
    dispatch(getRegDashboardMale());
    dispatch(getUnRegDashboard());
    dispatch(getUnRegDashboardMale());
    dispatch(getCountry());
    dispatch(getGeoStats());
    dispatch(getDashboardStats());
    dispatch(getDashboardStatsNew(5));
    dispatch(getDashboardStatsDeactive(3));
  }, []);
  const data = {
    labels:
      !!registerCompFemaleList &&
      registerCompFemaleList.map((value) => [
        moment.utc(value?.created_at).format("DD/MM"),
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
        moment.utc(value?.created_at).format("DD/MM"),
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
  const { count = 0, percent = 0, sign = "" } = dashboardStats;
  const dashboardStatsFunc = (func, status, timeframe, type) => {
    dispatch(
      func(
        status,
        moment().subtract(timeframe, type).utc().format(),
        moment().utc().format()
      )
    );
  };
  const getGeoLocationData = (place, gender, locationType) => {
    dispatch(getGeoStats(place, gender, locationType));
    setGeoData({ place, gender, locationType });
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
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStats, "", 1, "d")
                      }
                    >
                      Past Day
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStats, "", 7, "d")
                      }
                    >
                      Past Week
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStats, "", 1, "months")
                      }
                    >
                      Past Month
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStats, "", 1, "years")
                      }
                    >
                      Past Year
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>{count} people</Card.Subtitle>
                <Card.Text>
                  {percent ? (
                    <>
                      {" "}
                      {sign} {percent}%{" "}
                      {sign === "+" ? (
                        <img src="/images/upArrow.svg" />
                      ) : sign === "-" ? (
                        <img src="/images/downArrow.svg" />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    `0 %`
                  )}
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
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStatsNew, 5, 1, "d")
                      }
                    >
                      Past Day
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStatsNew, 5, 7, "d")
                      }
                    >
                      Past Week
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStatsNew, 5, 1, "months")
                      }
                    >
                      Past Month
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStatsNew, 5, 1, "years")
                      }
                    >
                      Past Year
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>
                  {dashboardStatsNew.length && dashboardStatsNew[0]?.count}{" "}
                  people
                </Card.Subtitle>
                {dashboardStatsNew.length && dashboardStatsNew[0]?.percent ? (
                  <Card.Text>
                    {dashboardStatsNew[0]?.sign} {dashboardStatsNew[0]?.percent}
                    %{" "}
                    {dashboardStatsNew[0]?.sign === "-" ? (
                      <img src="/images/downArrow.svg" />
                    ) : dashboardStatsNew[0]?.sign === "+" ? (
                      <img src="/images/upArrow.svg" />
                    ) : (
                      ""
                    )}
                  </Card.Text>
                ) : (
                  <Card.Text> 0 %</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title>Blocked Users</Card.Title>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    <TbDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStatsDeactive, 3, 1, "d")
                      }
                    >
                      Past Day
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(getDashboardStatsDeactive, 3, 7, "d")
                      }
                    >
                      Past Week
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(
                          getDashboardStatsDeactive,
                          3,
                          1,
                          "months"
                        )
                      }
                    >
                      Past Month
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        dashboardStatsFunc(
                          getDashboardStatsDeactive,
                          3,
                          1,
                          "years"
                        )
                      }
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
                  {dashboardStatsDeactive.length &&
                  dashboardStatsDeactive[0]?.percent ? (
                    <>
                      {dashboardStatsDeactive[0]?.sign}{" "}
                      {dashboardStatsDeactive[0]?.percent}%{" "}
                      {dashboardStatsDeactive[0]?.sign === "-" ? (
                        <img src="/images/downArrow.svg" />
                      ) : dashboardStatsDeactive[0]?.sign === "+" ? (
                        <img src="/images/upArrow.svg" />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    "0 %"
                  )}
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
                  role="button"
                  onClick={() => {
                    getGeoLocationData("", "", "country");
                  }}
                >
                  Country
                </Card.Link>
                {/* <Card.Link onClick={() => {
                  dispatch(getGeoStats("", "", "city"))}}> City </Card.Link> */}

                <Dropdown
                  align="end"
                  style={{ marginLeft: "16px", cursor: "pointer" }}
                >
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    <TbDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() => {
                        getGeoLocationData(
                          geoData.place,
                          "female",
                          geoData.locationType
                        );
                      }}
                    >
                      Female
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        getGeoLocationData(
                          geoData.place,
                          "male",
                          geoData.locationType
                        );
                      }}
                    >
                      Male
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        getGeoLocationData(
                          geoData.place,
                          "",
                          geoData.locationType
                        );
                      }}
                    >
                      Both
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
                            style={{
                              cursor:
                              geoData.locationType === "city" ? "text" : "pointer",
                            }}
                            role={geoData.locationType === "country" ? "button" : ""}
                            onClick={() => {
                              if (geoData.locationType === "country") {
                                getGeoLocationData(
                                  value?.location,
                                  geoData.gender,
                                  "city"
                                );
                              }
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UnattachedManagedDisks from "./UnattachedManagedDisks";
import OrphanedSnapshots from "./OrphanedSnapshots";
import HyperScalarAdvisor from "./HyperScalarAdvisor";
import SqlVmLicenses from "./SqlVmLicenses";
import OrphanedRSVBackups from "./OrphanedRSVBackups";
import api from "../api.js";
import componentUtil from "../componentUtil.js";
import { ContinuousColorLegend } from "@mui/x-charts";

const RecommendationSPA = () => {
  sessionStorage.removeItem("overviewPage");
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("unattachedManagedDisks");
  const navigate = useNavigate();
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");
  const [containerData, setContainerData] = useState([]);
  const [containerBoxData, setContainerBoxData] = useState([]);
  const [diskAcrossLocations, setDiskAcrossLocations] = useState([]);
  const [onDemandConsumed, setOnDemandConsumed] = useState([]);
  const [mangedDiskCost, setDiskCost] = useState([]);
  const [unattachedDiskConsumed, setUnattachedDiskCOnsumed] = useState([]);
  const [serviceCategoryData, setServiceCategoryData] = useState([]);
  const [boxdata, setBoxData] = useState([]);
  const [SnapshotTypeData, setSnapshotTypeData] = useState([]);
  const [ConsumedMeterData, setConsumedMeterData] = useState([]);
  const [snapLocations, setSnapLocations] = useState([]);
  const [onDemandData, setOnDemandData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [containerboxData, setContainerboxData] = useState([]);
  const [applicationimpact, setApplicationImpact] = useState([]);
  const [serviceimpact, setServiceImpact] = useState([]);
  const [CostvsSub, setCostvsSub] = useState([]);
  const [advisorCost, setadvisorCost] = useState([]);
  const colorPalette = ["#5F249F", "#330072", "#A98BD3", "#969696", "#D9D9D6"];
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(
    componentUtil.getSelectedCSP()
  );
  const [loading, setLoading] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);
  let inputData = selectedFilters;
  const [billingMonth, setBillingMonth] = useState([]);
  const [subscriptionTotalConsumed, setSubscriptionTotalConsumed] = useState(
    []
  );
  const [licenseTypevsConsumedMeter, setLicenseTypevsConsumedMeter] = useState(
    []
  );
  const [licenseTypevsCost, setLicenseTypevsCost] = useState([]);
  const [sqlVmLicenseTableData, setSqlVmLicenseTableData] = useState([]);
  const [rsvBoxData, setRsvBoxData] = useState([]);
  const [genericBar, setGenericBar] = useState([]);
  const [horizontalBar, setHorizonatalBar] = useState([]);
  const [rsvTableData, setRsvTableData] = useState([]);
  const [activeLicenseType, setActiveLicenseType] = useState("sqlvmlicense");

  useEffect(() => {
    const hash = location.hash.substring(1); // Removes the "#" from the hash
    //location.hash retrieves the part of the URL after #
    setActiveSection(hash);
  }, [location]);

  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
  };

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleMonthChange = (months) => {
    setBillingMonth(months);
  };

  const bars_UnattachedManagedDisks = [
    {
      dataKey: "OnDemand",
      fill: "#5F249F",
      name: "On Demand Cost",
      barSize: 20,
    },
    {
      dataKey: "ConsumedMeter",
      fill: "rgba(0, 150, 143, 0.8)",
      name: "Consumed Meter",
      barSize: 20,
    },
  ];
  //unattachedManagedDisks ends

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          onDemand,
          countUnattachedDisk,
          impactedApplications,
          onDemandConsumedSubscription,
          diskCost,
          diskCosumed,
          diskLocation,
          onDemandCostAllocations,
        ] = await Promise.all([
          api.getTotalOnDemandCost(inputData),
          api.getCountUnattachedDisk1(inputData),
          api.getImpactedApplications(inputData),
          api.getSubscriptionOnDemandConsumedMeter(inputData),
          api.getDisktypevsCost(inputData),
          api.getDisktypevsConsumedMeter(inputData),
          api.getDiskAcrossLocations(inputData),
          api.getCostAllocations(inputData),
        ]);
        const currencySymbol = await componentUtil.getCurrencySymbol();
        setCurrencySymbol(currencySymbol);
        const currencyPreference = await componentUtil.getCurrencyPreference();

        setCurrencyPreference(currencyPreference);

        const onDemandCost = onDemand?.cost ? onDemand.cost.toFixed(2) : "0.00";
        const diskCount = countUnattachedDisk?.diskcount ?? 0;
        const impactedCount = impactedApplications?.ImpcatedApplications ?? 0;

        const dataSet1 = [
          {
            number:
              onDemandCost > 1000
                ? currencyPreference === "start"
                  ? `${currencySymbol}${(onDemandCost / 1000).toFixed(2)}K`
                  : `${(onDemandCost / 1000).toFixed(2)}K${currencySymbol}`
                : currencyPreference === "start"
                ? `${currencySymbol}${onDemandCost}`
                : `${onDemandCost}${currencySymbol}`,
            text: "Total On Demand Cost",
          },
          {
            number: diskCount,
            text:
              selectedProvider === 100
                ? "Count of Disks Unattached"
                : "Count of Volumes Unattached",
          },
          { number: impactedCount, text: "Impacted Applications" },
        ];

        setDiskAcrossLocations(diskLocation);
        setOnDemandConsumed(onDemandConsumedSubscription);
        setContainerData(dataSet1);

        setUnattachedDiskCOnsumed(diskCosumed);
        setDiskCost(diskCost);

        const aggregateData = (data) => {
          const processLevel = (obj) => {
            if (typeof obj !== "object" || obj === null) return obj;

            const entries = Object.entries(obj);
            if (
              entries.length > 0 &&
              typeof entries[0][1] === "object" &&
              !("totalCost" in entries[0][1])
            ) {
              return entries.map(([key, value]) => {
                const processedValue = processLevel(value);
                const totalCost = processedValue.reduce(
                  (sum, item) => sum + (item.totalCost || 0),
                  0
                );
                const diskCount = processedValue.reduce(
                  (sum, item) => sum + (item.diskCount || 0),
                  0
                );

                return {
                  name: key,
                  ownername: null,
                  totalCost: totalCost,
                  diskCount: diskCount,
                  environment: null,
                  children: processedValue,
                };
              });
            }

            return entries.map(([key, value]) => ({
              name: key,
              ownername: value.ownername || null,
              totalCost: value.totalCost || 0,
              diskCount: value.diskcount || 0,
              environment:
                value.environment !== null ? value.environment : "null",
            }));
          };

          return Object.entries(data).map(([subscription, value]) => {
            const children = processLevel(value);
            const totalCost = children.reduce(
              (sum, item) => sum + (item.totalCost || 0),
              0
            );
            const diskCount = children.reduce(
              (sum, item) => sum + (item.diskCount || 0),
              0
            );

            return {
              name: subscription,
              ownername: null,
              totalCost: totalCost,
              diskCount: diskCount,
              environment: null,
              children: children,
            };
          });
        };

        const formattedData = aggregateData(onDemandCostAllocations);

        console.log("formatted data", formattedData);
        setServiceCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [inputData, selectedProvider]);

  const tableData_UnattachedManagedDisks = [
    {
      tableTitle:
        selectedProvider === 100
          ? "On-Demand Cost Allocation"
          : "On-Demand Cost Allocation",

      columnHead1: {
        key: "applicationName",
        title: selectedProvider === 100 ? "Subscription Name" : "Account Name",
      },
      columnHead2: { key: "ownername", title: "Owner Name" },
      columnHead3: {
        key: "totalCost",
        title: `Total Cost (${currencySymbol})`,
      },
      columnHead4: {
        key: "diskCount",
        title: selectedProvider === 100 ? "Count of Disks" : "Count of Volumes",
      },

      columnHead5: {
        key: "environment",
        title: "Environment",
      },
    },
  ];

  const pieChartData1 = mangedDiskCost.map((entry, index) => ({
    name: entry.DiskType,
    value: Math.floor(entry.totalcost), // Adjust value if necessary
    color: colorPalette[index % colorPalette.length],
  }));

  const pieChartData2 = unattachedDiskConsumed.map((entry, index) => ({
    name: entry.DiskType,
    value: Math.floor(entry.totalcount), // Adjust value if necessary
    color: colorPalette[index % colorPalette.length],
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          snapshotResponse,
          costResponse,
          applicationsResponse,
          snapshotTypeData,
          consumedMeterData,
          location,
          ondemandsnapshot,
          costallocationresponse,
        ] = await Promise.all([
          api.getSnapshotCount(inputData),
          api.getSnapshotCost(inputData),
          api.getApplications(inputData),
          api.gettypevscost(inputData),
          api.getConsumedMeter(inputData),
          api.getsnapLocations(inputData),
          api.getOndemandCost(inputData),
          api.getSnapCostallocation(inputData),
        ]);
        const currencySymbol = await componentUtil.getCurrencySymbol();
        setCurrencySymbol(currencySymbol);
        const currencyPreference = await componentUtil.getCurrencyPreference();
        setCurrencyPreference(currencyPreference);

        const orphanedSnapshotCount = snapshotResponse.snapshostCount || 0;
        const snapshotCost = parseFloat(costResponse.cost || 0).toFixed(2);
        const applicationsCount = applicationsResponse.impactedApplication || 0;

        const dataSet2 = [
          { number: orphanedSnapshotCount, text: "Count of Snapshots" },
          {
            number:
              snapshotCost > 1000
                ? currencyPreference === "start"
                  ? `${currencySymbol}${(snapshotCost / 1000).toFixed(2)}K`
                  : `${(snapshotCost / 1000).toFixed(2)}K${currencySymbol}`
                : currencyPreference === "start"
                ? `${currencySymbol}${snapshotCost}`
                : `${snapshotCost}${currencySymbol}`,
            text: "Snapshot Cost",
          },
          { number: applicationsCount, text: "Impacted Applications" },
        ];
        setBoxData(dataSet2);
        setSnapshotTypeData(snapshotTypeData);
        setConsumedMeterData(consumedMeterData);
        setSnapLocations(location);
        setOnDemandData(ondemandsnapshot);

        const aggregateData = (data) => {
          const processLevel = (obj) => {
            if (typeof obj !== "object" || obj === null) return obj;

            const entries = Object.entries(obj);
            if (
              entries.length > 0 &&
              typeof entries[0][1] === "object" &&
              !("totalCost" in entries[0][1])
            ) {
              return entries.map(([key, value]) => {
                const processedValue = processLevel(value);
                const totalCost = processedValue.reduce(
                  (sum, item) => sum + (item.totalCost || 0),
                  0
                );
                const snapshotCount = processedValue.reduce(
                  (sum, item) => sum + (item.snapshotCount || 0),
                  0
                );

                return {
                  name: key,
                  ownername: null,
                  totalCost: totalCost,
                  snapshotCount: snapshotCount,
                  environment: null,
                  children: processedValue,
                };
              });
            }

            return entries.map(([key, value]) => ({
              name: key,
              ownername: value.ownername || null,
              totalCost: value.totalCost || 0,
              snapshotCount: value.snapshotCount || 0,
              environment:
                value.environment !== null ? value.environment : "null",
            }));
          };

          return Object.entries(data).map(([subscription, value]) => ({
            name: subscription,
            ownername: null,
            totalCost: 0,
            snapshotCount: 0,
            environment: null,
            children: processLevel(value),
          }));
        };

        const formattedData = aggregateData(costallocationresponse);
        setCostData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProvider, inputData]);

  const piechart2 = SnapshotTypeData.map((item, index) => ({
    name: item.SnapshotType,
    value: parseFloat(item.totalcost.toFixed(2)),
    color: colorPalette[index % colorPalette.length],
  }));

  const piechart1 = ConsumedMeterData.map((item, index) => ({
    name: item.SnapshotType,
    value: parseFloat(item.Count.toFixed(2)),
    color: colorPalette[index % colorPalette.length],
  }));

  const tableData_OrphanedSnapshots = [
    {
      tableTitle: "On-Demand Cost Allocation",
      columnHead1: {
        key: "applicationName",
        title: "Application/Project Name",
      },
      columnHead2: { key: "ownername", title: "Owner Name" },
      columnHead3: {
        key: "totalCost",
        title: `Total Cost (${currencySymbol})`,
      },
      columnHead4: {
        key: "snapshotCount",
        title: "Count of Snapshots",
      },
      columnHead5: {
        key: "environment",
        title: "Environment",
      },
    },
  ];

  const bars_OrphanedSnapshots = [
    {
      dataKey: "totalCost",
      fill: "#5F249F",
      name: "On Demand Cost",
      barSize: 20,
    },
    {
      dataKey: "consumedMeter",
      fill: "rgba(0, 150, 143, 0.8)",
      name: "Consumed Meter",
      barSize: 20,
    },
  ];

  //orphanedSnapshots ends

  //HyperScalarAdvisor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          recommendationsData,
          highImpactData,
          applications,
          services,
          subImpact,
          advisorcostresponse,
        ] = await Promise.all([
          api.getadvisorrecommendations(),
          api.getadvisorhighimpact(),
          api.getadvisorApplications(),
          api.getadvisorServices(),
          api.getadvisorcostvsimpact(),
          api.getadvisorCost(),
        ]);

        const currencySymbol = await componentUtil.getCurrencySymbol();
        setCurrencySymbol(currencySymbol);
        const currencyPreference = await componentUtil.getCurrencyPreference();
        setCurrencyPreference(currencyPreference);
        const recommendations = recommendationsData?.recommendationcount || 0;
        const impact = highImpactData?.highimpactcount || 0;

        const dataSet1 = [
          { number: recommendations, text: "Number of Recommendations" },
          { number: impact, text: "High Impact Recommendations" },
        ];

        setContainerboxData(dataSet1);
        setApplicationImpact(applications);
        setServiceImpact(services);
        setCostvsSub(subImpact);

        const aggregateData = (data) => {
          const processLevel = (obj) => {
            if (!obj || typeof obj !== "object") return null;

            return Object.entries(obj)
              .map(([key, value]) => {
                if (typeof value !== "object" || value === null) return null;

                // If `value` contains objects, recursively process the next level
                const nested = processLevel(value);

                // Identify if it's a leaf node (contains actual data fields instead of more objects)
                const isLeafNode = Object.values(value).some(
                  (v) => typeof v !== "object" || v === null
                );

                if (isLeafNode) {
                  return {
                    name: key,
                    ...value, // Spread all properties (e.g., ownername, totalCost, sqlServerLicenseType, etc.)
                  };
                }

                // Aggregate `totalCost` dynamically
                const totalCost = nested.reduce(
                  (sum, item) => sum + (item.totalCost || 0),
                  0
                );

                return {
                  name: key,
                  totalCost,
                  children: nested, // Store next-level processed data
                };
              })
              .filter(Boolean);
          };

          return processLevel(data);
        };

        const formattedData = aggregateData(advisorcostresponse);
        setadvisorCost(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedProvider, inputData]);

  const formattedCostvsSub = Object.entries(CostvsSub).map(
    ([subscriptionName, impacts]) => {
      let impactData = Object.fromEntries(
        Object.entries(impacts).map(([impactLevel, costObj]) => [
          impactLevel,
          costObj.TotalCost,
        ])
      );
      return { subscriptionName, ...impactData };
    }
  );

  const Piechart1 = Array.isArray(applicationimpact)
    ? applicationimpact.map((item, index) => ({
        name: item.Application,
        value: item.Totalcost ? parseFloat(item.Totalcost.toFixed(2)) : 0,
        color: colorPalette[index % colorPalette.length],
      }))
    : [];

  const Piechart2 = Array.isArray(serviceimpact)
    ? serviceimpact.map((item, index) => ({
        name: item.ServiceCategory,
        value: item.Totalcost ? parseFloat(item.Totalcost.toFixed(2)) : 0,
        color: colorPalette[index % colorPalette.length],
      }))
    : [];

  const bars_HyperScalarAdvisor = [
    {
      dataKey: "High",
      fill: "#2CAFFE",
      name: "High",
      barSize: 20,
    },
    {
      dataKey: "Medium",
      fill: "#006975",
      name: "Medium",
      barSize: 20,
    },
    {
      dataKey: "Low",
      fill: "#330072",
      name: "Low",
      barSize: 20,
    },
  ];

  const tableData_HyperScalarAdvisor = [
    {
      tableTitle: "On Demand Cost Allocation",
      columnHead1: { key: "name", title: "Name" },
      columnHead2: {
        key: "totalCost",
        title: `Total Cost (${currencySymbol})`,
      },
      columnHead3: { key: "impact", title: "Impact" },
      columnHead4: { key: "solution", title: "Solution" },
      columnHead5: { key: "ownername", title: "Owner Name" },
      columnHead6: { key: "applicationname", title: "Application Name" },
      columnHead7: { key: "environment", title: "Environment" },
    },
  ];

  // HyperScalarAdvisor ends

  //SqlVmLicenses

  const tableData_SqlVmLicenses = [
    {
      tableTitle: "On Demand Cost Allocation for licenses",
      columnHead1: {
        key: "applicationName",
        title: "Item Name",
      },
      columnHead2: {
        key: "sqlServerLicenseType",
        title: (
          <div
            style={{
              paddingTop: "20px",
            }}
          >
            {activeLicenseType === "sqlvmlicense"
              ? "SQL Server License Type"
              : "VM License Type"}
          </div>
        ),
      },
      columnHead3: {
        key: "totalCost",
        title: `Total Cost (${currencySymbol})`,
      },
      columnHead4: {
        key: "ownername",
        title: "Owner name",
      },

      columnHead5: {
        key: "applicationname",
        title: "Application",
      },
      columnHead6: {
        key: "environment",
        title: "Environment",
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          ahubCount,
          payGoCount,
          totalConsumed,
          licenseTypevsConsumedMeter,
          licenseTypevsCost,
          sqlCostAllocation,
        ] = await Promise.all([
          api.getAhubCount(inputData, activeLicenseType),
          api.getPayGoCount(inputData, activeLicenseType),
          api.getTotalConsumed(inputData, activeLicenseType),
          api.getLicenseTypevsConsumedMeter(inputData, activeLicenseType),
          api.getLicenseTypevsCost(inputData, activeLicenseType),
          api.getSqlCostAllocation(inputData, activeLicenseType),
        ]);

        const aHubCount = ahubCount?.ahubcount ? ahubCount.ahubcount : "0";
        const paygoCount = payGoCount?.paygcount ?? 0;

        const dataSet1 = [
          {
            number: aHubCount,
            text: "Total Count of AHUB License",
          },

          { number: paygoCount, text: "Total Count of PAYGO License" },
        ];

        setContainerBoxData(dataSet1);
        setSubscriptionTotalConsumed(totalConsumed);
        setLicenseTypevsConsumedMeter(licenseTypevsConsumedMeter);
        setLicenseTypevsCost(licenseTypevsCost);
        const currencySymbol = await componentUtil.getCurrencySymbol();
        setCurrencySymbol(currencySymbol);
        const currencyPreference = await componentUtil.getCurrencyPreference();
        setCurrencyPreference(currencyPreference);

        const aggregateData = (data) => {
          const processLevel = (obj) => {
            if (!obj || typeof obj !== "object") return null;

            return Object.entries(obj)
              .map(([key, value]) => {
                if (typeof value !== "object" || value === null) return null;

                // If `value` contains objects, recursively process the next level
                const nested = processLevel(value);

                // Identify if it's a leaf node (contains actual data fields instead of more objects)
                const isLeafNode = Object.values(value).some(
                  (v) => typeof v !== "object" || v === null
                );

                if (isLeafNode) {
                  return {
                    name: key,
                    ...value, // Spread all properties (e.g., ownername, totalCost, sqlServerLicenseType, etc.)
                  };
                }

                // Aggregate `totalCost` dynamically
                const totalCost = nested.reduce(
                  (sum, item) => sum + (item.totalCost || 0),
                  0
                );

                return {
                  name: key,
                  totalCost,
                  children: nested, // Store next-level processed data
                };
              })
              .filter(Boolean);
          };

          return processLevel(data);
        };
        const sqlVmFormattedData = aggregateData(sqlCostAllocation);
        setSqlVmLicenseTableData(sqlVmFormattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [inputData, selectedProvider, activeLicenseType]);

  const pieChartSql = licenseTypevsConsumedMeter.map((entry, index) => ({
    name: entry.licensetype,
    value: Math.floor(entry.totalcount), // Adjust value if necessary
    color: colorPalette[index % colorPalette.length],
  }));

  const pieChartSql1 = licenseTypevsCost.map((entry, index) => ({
    name: entry.licensetype,
    value: Math.floor(entry.Totalcost), // Adjust value if necessary
    color: colorPalette[index % colorPalette.length],
  }));

  //SqlVmLicenses ends

  //OrphanedRSVBackups

  const horizontaldata_OrphanedRSVBackups = [
    { name: "Subscription 1", count: 100 },
    { name: "Subscription 2", count: 150 },
    { name: "Subscription 3", count: 200 },
    { name: "Subscription 4", count: 75 },
    { name: "Subscription 5", count: 125 },
  ];

  const data1_OrphanedRSVBackups = [
    { name: "SQL Database", Unhealthy: "9" },
    { name: "Virtual Machine", Unhealthy: "11" },
    { name: "Azure File Share", Unhealthy: "19" },
    { name: "Azure NetApp Files", Unhealthy: "22" },
  ];

  const tableData_OrphanedRSVBackups = [
    {
      tableTitle: "On Demand Cost for Recommendations",
      columnHead1: { key: "name", title: "Item Name" },
      columnHead2: {
        key: "totalCost",
        title: `Total Cost (${currencySymbol})`,
      },
      columnHead3: {
        key: "protection_status",
        title: "Protection Status",
      },
      // columnHead4: { key: "protection_state", title: "Protection State" },
      columnHead5: { key: "applicationname", title: "Application Name" },
      columnHead6: {
        key: "softDeleteRetentionPeriod",
        title: "Retention Period",
      },
      columnHead7: {
        key: "lastBackupTime",
        // title: (
        //   <>
        //     Backup Time <br /> (YYYY-MM-DD)
        //   </>
        // ),
        title: (
          <div
            style={{
              paddingTop: "20px",
            }}
          >
            <>
              Backup Date <br /> (YYYY-MM-DD)
            </>
          </div>
        ),
      },
      columnHead8: { key: "isArchiveEnabled", title: "Archive Enabled" },
    },
  ];

  const bars_OrphanedRSVBackups = [
    {
      dataKey: "Unhealthy",
      fill: "#2CAFFE",
      name: "Unhealthy",
      barSize: 20,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          backUpCount,
          unhealthyBackUpCount,
          subBackUpCount,
          healthyProtectionStatus,
          rsvCostallocation,
        ] = await Promise.all([
          api.getBackUpCount(inputData),
          api.getUnhealthyBackUpCount(inputData),
          api.getSubBackUpCount(inputData),
          api.getHealthyProtectionStatus(inputData),
          api.getRsvCostallocation(inputData),
        ]);

        const currencySymbol = await componentUtil.getCurrencySymbol();
        setCurrencySymbol(currencySymbol);
        const currencyPreference = await componentUtil.getCurrencyPreference();
        setCurrencyPreference(currencyPreference);

        const rsvBackUpCount = backUpCount?.Orphanedbackupcount || 0;
        const rsvUnhealthyBackUpCount =
          unhealthyBackUpCount?.Unhealthybackupcount || 0;

        const dataSet1 = [
          {
            number: rsvUnhealthyBackUpCount,
            text: "Count of Unhealthy Backups",
          },
          { number: rsvBackUpCount, text: "Count of Orphan Backups" },
        ];
        setRsvBoxData(dataSet1);
        setGenericBar(healthyProtectionStatus);
        setHorizonatalBar(subBackUpCount);

        const aggregateData = (data) => {
          const processLevel = (obj) => {
            if (!obj || typeof obj !== "object") return null;

            return Object.entries(obj)
              .map(([key, value]) => {
                if (typeof value !== "object" || value === null) return null;

                // If `value` contains objects, recursively process the next level
                const nested = processLevel(value);

                // Identify if it's a leaf node (contains actual data fields instead of more objects)
                const isLeafNode = Object.values(value).some(
                  (v) => typeof v !== "object" || v === null
                );

                if (isLeafNode) {
                  return {
                    name: key,
                    totalCost: value.totalCost || 0,
                    protection_status: value.protection_status || "",
                    protection_state: value.protection_state || "",
                    lastBackupTime: value.lastBackupTime
                      ? new Date(value.lastBackupTime)
                          .toISOString()
                          .split("T")[0]
                      : "",
                    applicationname: value.applicationname || null,
                    isArchiveEnabled: value.isArchiveEnabled || "False",
                    softDeleteRetentionPeriod:
                      value.softDeleteRetentionPeriod || "0",
                  };
                }

                // Aggregate `totalCost` dynamically
                const totalCost = nested.reduce(
                  (sum, item) => sum + (item.totalCost || 0),
                  0
                );

                return {
                  name: key,
                  totalCost,
                  children: nested, // Store next-level processed data
                };
              })
              .filter(Boolean);
          };

          return processLevel(data);
        };

        setRsvTableData(aggregateData(rsvCostallocation));
        console.log("ddat", aggregateData(rsvCostallocation));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [inputData, selectedProvider]);

  //OrphanedRSVBackups ends

  console.log("ss", selectedProvider);
  return (
    <div>
      {activeSection === "unattachedManagedDisks" && (
        <UnattachedManagedDisks
          tableData={tableData_UnattachedManagedDisks}
          dummyData={serviceCategoryData}
          dataSet1={containerData}
          data={onDemandConsumed}
          data1={pieChartData1}
          data2={pieChartData2}
          horizontaldata={diskAcrossLocations}
          bars={bars_UnattachedManagedDisks}
          onButtonClick={handleButtonClick}
          onFiltersChange={handleFiltersChange}
          selectedCSP={selectedProvider}
          currencySymbol={currencySymbol}
          currencyPreference={currencyPreference}
          loading={loading}
        />
      )}
      {activeSection === "orphanedSnapshots" && (
        <OrphanedSnapshots
          tableData={tableData_OrphanedSnapshots}
          dummyData={costData}
          dataSet2={boxdata}
          data={onDemandData}
          data1={piechart1}
          data2={piechart2}
          horizontaldata={snapLocations}
          bars={bars_OrphanedSnapshots}
          onButtonClick={handleButtonClick}
          onFiltersChange={handleFiltersChange}
          selectedCSP={selectedProvider}
          onMonthChange={handleMonthChange}
          currencySymbol={currencySymbol}
          currencyPreference={currencyPreference}
          loading={loading}
        />
      )}
      {activeSection === "hyperScalarAdvisor" && (
        <HyperScalarAdvisor
          tableData={tableData_HyperScalarAdvisor}
          dummyData={advisorCost}
          dataSet1={containerboxData}
          data={formattedCostvsSub}
          data1={Piechart1}
          data2={Piechart2}
          bars={bars_HyperScalarAdvisor}
          selectedCSP={selectedProvider}
          onButtonClick={handleButtonClick}
          onFiltersChange={handleFiltersChange}
          onMonthChange={handleMonthChange}
          currencySymbol={currencySymbol}
          currencyPreference={currencyPreference}
          loading={loading}
        />
      )}
      {activeSection === "SqlVmLicenses" && (
        <SqlVmLicenses
          tableData={tableData_SqlVmLicenses}
          dummyData={sqlVmLicenseTableData}
          dataSet1={containerBoxData}
          data={subscriptionTotalConsumed}
          data1={pieChartSql}
          data2={pieChartSql1}
          bars={bars_UnattachedManagedDisks}
          currencySymbol={currencySymbol}
          currencyPreference={currencyPreference}
          selectedCSP={selectedProvider}
          onButtonClick={handleButtonClick}
          onFiltersChange={handleFiltersChange}
          loading={loading}
          onActiveLicenseType={setActiveLicenseType}
          activeLicenseType={activeLicenseType}
        />
      )}
      {activeSection === "orphanedrsvbackups" && (
        <OrphanedRSVBackups
          tableData={tableData_OrphanedRSVBackups}
          dummyData={rsvTableData}
          dataSet1={rsvBoxData}
          data1={genericBar}
          bars={bars_OrphanedRSVBackups}
          horizontaldata={horizontalBar}
          onButtonClick={handleButtonClick}
          onFiltersChange={handleFiltersChange}
          selectedCSP={selectedProvider}
          currencySymbol={currencySymbol}
          currencyPreference={currencyPreference}
          loading={loading}
        />
      )}
    </div>
  );
};

export default RecommendationSPA;

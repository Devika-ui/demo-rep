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

const RecommendationSPA = () => {
  sessionStorage.removeItem("overviewPage");
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("unattachedManagedDisks");
  const navigate = useNavigate();
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");
  const [containerData, setContainerData] = useState([]);
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
  const [advisorCost, setadvisorCost] =useState([]);
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

          return Object.entries(data).map(([subscription, value]) => ({
            name: subscription,
            ownername: null,
            totalCost: 0,
            diskCount: 0,
            environment: null,
            children: processLevel(value),
          }));
        };

        const formattedData = aggregateData(onDemandCostAllocations);

        // console.log("formatted data", formattedData);
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
        key: "diskcount",
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
          { number:  
               snapshotCost > 1000
              ? currencyPreference === "start"
                ? `${currencySymbol}${(snapshotCost / 1000).toFixed(2)}K`
                : `${(snapshotCost / 1000).toFixed(2)}K${currencySymbol}`
              : currencyPreference === "start"
              ? `${currencySymbol}${snapshotCost}`
              : `${snapshotCost}${currencySymbol}`, text: "Snapshot Cost" },
          { number: applicationsCount, text: "Impacted Applications" },
        ];
        setBoxData(dataSet2);
        setSnapshotTypeData(snapshotTypeData);
        setConsumedMeterData(consumedMeterData);
        setSnapLocations(location);
        setOnDemandData(ondemandsnapshot);

        const aggregateData = (data) => {
          return Object.entries(data)
            .map(([subscription, storageData]) => {
              if (!storageData || typeof storageData !== "object") return null;

              const formattedStorages = Object.entries(storageData)
                .map(([storage, storageTypes]) => {
                  if (!storageTypes || typeof storageTypes !== "object")
                    return null;

                  const formattedStorageTypes = Object.entries(storageTypes)
                    .map(([storageType, resourceGroups]) => {
                      if (!resourceGroups || typeof resourceGroups !== "object")
                        return null;

                      const formattedResourceGroups = Object.entries(
                        resourceGroups
                      )
                        .map(([resourceGroup, resources]) => {
                          if (!resources || typeof resources !== "object")
                            return null;

                          const formattedResources = Object.entries(
                            resources
                          ).map(([resource, resourceData]) => ({
                            name: resource,
                            ownername: resourceData?.ownername || null,
                            totalCost: resourceData?.totalCost || 0,
                            snapshotCount: resourceData?.snapshotCount || 0,
                            environment:
                              resourceData?.environment !== null
                                ? resourceData?.environment
                                : "null",
                          }));

                          // Aggregate totals for the resource group
                          const groupTotalCost = formattedResources.reduce(
                            (sum, resource) => sum + resource.totalCost,
                            0
                          );
                          const groupsnapshotCount = formattedResources.reduce(
                            (sum, resource) => sum + resource.snapshotCount,
                            0
                          );

                          return {
                            name: resourceGroup,
                            ownername: null,
                            totalCost: groupTotalCost,
                            snapshotCount: groupsnapshotCount,
                            environment: null,
                            resources: formattedResources,
                          };
                        })
                        .filter(Boolean);

                      // Aggregate totals for the storage type
                      const storageTypeTotalCost =
                        formattedResourceGroups.reduce(
                          (sum, group) => sum + group.totalCost,
                          0
                        );
                      const storageTypesnapshotCount =
                        formattedResourceGroups.reduce(
                          (sum, group) => sum + group.snapshotCount,
                          0
                        );

                      return {
                        name: storageType,
                        ownername: null,
                        totalCost: storageTypeTotalCost,
                        snapshotCount: storageTypesnapshotCount,
                        environment: null,
                        resourceGroups: formattedResourceGroups,
                      };
                    })
                    .filter(Boolean);

                  // Aggregate totals for storage
                  const storageTotalCost = formattedStorageTypes.reduce(
                    (sum, type) => sum + type.totalCost,
                    0
                  );
                  const storagesnapshotCount = formattedStorageTypes.reduce(
                    (sum, type) => sum + type.snapshotCount,
                    0
                  );

                  return {
                    name: storage,
                    ownername: null,
                    totalCost: storageTotalCost,
                    snapshotCount: storagesnapshotCount,
                    environment: null,
                    storageTypes: formattedStorageTypes,
                  };
                })
                .filter(Boolean);

              // Aggregate totals for subscription
              const subscriptionTotalCost = formattedStorages.reduce(
                (sum, storage) => sum + storage.totalCost,
                0
              );
              const subscriptionsnapshotCount = formattedStorages.reduce(
                (sum, storage) => sum + storage.snapshotCount,
                0
              );

              return {
                name: subscription,
                ownername: null,
                totalCost: subscriptionTotalCost,
                snapshotCount: subscriptionsnapshotCount,
                environment: null,
                storages: formattedStorages,
              };
            })
            .filter(Boolean);
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
        const [recommendationsData,
               highImpactData,
               applications,
               services,
               subImpact,
               advisorcostresponse
            ] = await Promise.all([
              api.getadvisorrecommendations(),
              api.getadvisorhighimpact(),
              api.getadvisorApplications(),
              api.getadvisorServices(),
              api.getadvisorcostvsimpact(),
              api.getadvisorCost()
            ]);
            console.log("Fetched cost vs impact data:",subImpact);
            const currencySymbol = await componentUtil.getCurrencySymbol();
            setCurrencySymbol(currencySymbol);
            const currencyPreference = await componentUtil.getCurrencyPreference();
            setCurrencyPreference(currencyPreference);
            const recommendations = recommendationsData?.recommendationcount || 0;
            const impact = highImpactData?.highimpactcount || 0;

            const dataSet1 = [
              {number:recommendations ,text: "Number of Recommendations"},
              {number:impact , text :"High Impact Recommendations"}
            ]

            setContainerboxData(dataSet1);
            setApplicationImpact(applications);
            setServiceImpact(services);
            setCostvsSub(subImpact)

            const aggregateData = (data) => {
              return Object.entries(data)
                .map(([subscription, categories]) => {
                  if (!categories || typeof categories !== "object") return null;
            
                  const formattedCategories = Object.entries(categories)
                    .map(([category, plans]) => {
                      if (!plans || typeof plans !== "object") return null;
            
                      const formattedPlans = Object.entries(plans)
                        .map(([plan, resourceGroups]) => {
                          if (!resourceGroups || typeof resourceGroups !== "object") return null;
            
                          const formattedResourceGroups = Object.entries(resourceGroups)
                            .map(([resourceGroup, resources]) => {
                              if (!resources || typeof resources !== "object") return null;
            
                              const formattedResources = Object.entries(resources).map(
                                ([resource, resourceData]) => ({
                                  name: resource,
                                  ownername: resourceData?.ownername || null,
                                  totalCost: resourceData?.totalCost || 0,
                                  impact: resourceData?.impact || "Unknown",
                                  solution: resourceData?.solution || "No solution provided",
                                  applicationname: resourceData?.applicationname || null,
                                  environment: resourceData?.environment !== null
                                    ? resourceData?.environment
                                    : "null",
                                })
                              );
            
                              // Aggregate totals for the resource group
                              const groupTotalCost = formattedResources.reduce(
                                (sum, resource) => sum + resource.totalCost,
                                0
                              );
            
                              return {
                                name: resourceGroup,
                                totalCost: groupTotalCost,
                                impact: null,
                                solution: null,
                                ownername: null,
                                applicationname: null,
                                environment: null,
                                resources: formattedResources,
                              };
                            })
                            .filter(Boolean);
            
                          // Aggregate totals for the plan
                          const planTotalCost = formattedResourceGroups.reduce(
                            (sum, group) => sum + group.totalCost,
                            0
                          );
            
                          return {
                            name: plan,
                            totalCost: planTotalCost,
                            impact: null,
                            solution: null,
                            ownername: null,
                            applicationname: null,
                            environment: null,
                            resourceGroups: formattedResourceGroups,
                          };
                        })
                        .filter(Boolean);
            
                      // Aggregate totals for the category
                      const categoryTotalCost = formattedPlans.reduce(
                        (sum, plan) => sum + plan.totalCost,
                        0
                      );
            
                      return {
                        name: category,
                        totalCost: categoryTotalCost,
                        impact: null,
                        solution: null,
                        ownername: null,
                        applicationname: null,
                        environment: null,
                        plans: formattedPlans,
                      };
                    })
                    .filter(Boolean);
            
                  // Aggregate totals for the subscription
                  const subscriptionTotalCost = formattedCategories.reduce(
                    (sum, category) => sum + category.totalCost,
                    0
                  );
            
                  return {
                    name: subscription,
                    totalCost: subscriptionTotalCost,
                    impact: null,
                    solution: null,
                    ownername: null,
                    applicationname: null,
                    environment: null,
                    categories: formattedCategories,
                  };
                })
                .filter(Boolean);
            };
            
            const formattedData = aggregateData(advisorcostresponse);
            setadvisorCost(formattedData);
            
            console.log("Updated state:",CostvsSub);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
            fetchData();
          }, [inputData, selectedProvider]);

          const formattedCostvsSub = CostvsSub.map((item) => ({
            subscriptionName: item.Subscription,
            [item.Impact]: item.Totalcost,
          }));
          
          const Piechart1 = applicationimpact?.map((item, index) => ({
            name: item.Application,
            value: item.Totalcost ? parseFloat(item.Totalcost.toFixed(2)) : 0,
            color: colorPalette[index % colorPalette.length],
          })) || [];

          const Piechart2 = serviceimpact?.map((item, index) => ({
            name: item.ServiceCategory,
            value: item.Totalcost ? parseFloat(item.Totalcost.toFixed(2)) : 0,
            color: colorPalette[index % colorPalette.length],
          })) || [];   
          

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
      columnHead1: { key: "name", title: "Name",},
      columnHead2: { key: "totalCost",
        title: `Total Cost (${currencySymbol})`,
       },
      columnHead3: {key: "impact",title: "Impact"},
      columnHead4: {key: "solution",title: "Solution"},
      columnHead5: {key: "ownername",title: "Owner Name"},
      columnHead6: {key: "applicationname",title: "Application Name"},
      columnHead7: {key: "environment",title: "Environment"},
    },
  ];

  const dummyData_HyperScalarAdvisor = [
    {
      name: "Virtual Machine",
      totalBill: "$400",
      onDemandCost: "$100",
      commitmentsCost: "$200",
      savings: "$50",
      budget: "10",
      services: [
        {
          name: "VM1",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG1",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM1-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM1-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG2",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM2-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM2-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "VM2",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG3",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM3-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM3-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG4",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM4-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM4-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Storage",
      totalBill: "$300",
      onDemandCost: "$120",
      commitmentsCost: "$180",
      savings: "$60",
      budget: "10",
      services: [
        {
          name: "Storage1",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG5",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage1-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage1-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG6",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage2-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage2-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "Storage2",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG7",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage3-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage3-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG8",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage4-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage4-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const data2_HyperScalarAdvisor = [
    {
      name: "Virtual Machines",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    { name: "DR", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    {
      name: "Storage",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Bandwidth",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    { name: "ANF", value: Math.floor(Math.random() * 100), color: "#5F249F" },
  ];
  const data1_HyperScalarAdvisor = [
    { name: "App 1", value: Math.floor(Math.random() * 100), color: "#0099C6" },
    { name: "App 2", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    { name: "App 3", value: Math.floor(Math.random() * 100), color: "#FFCD00" },
    { name: "App 4", value: Math.floor(Math.random() * 100), color: "#00968F" },
    { name: "App 5", value: Math.floor(Math.random() * 100), color: "#5F249F" },
  ];
  const dataSet1_HyperScalarAdvisor = [
    { number: "50", text: "Number of Recommendations" },
    { number: "10", text: "High Impact Recommendations" },
  ];
  const data_HyperScalarAdvisor = [
    { name: "Subscription 1", High: 400000, Medium: 50000, Low: 2000 },
    { name: "Subscription 2", High: 250000, Medium: 80000, Low: 5000 },
    { name: "Subscription 3", High: 90000, Medium: 10000, Low: 3000 },
    { name: "Subscription 4", High: 50000, Medium: 115000, Low: 10000 },
    { name: "Subscription 5", High: 25000, Medium: 100000, Low: 10000 },
    { name: "Subscription 6", High: 15000, Medium: 75000, Low: 7000 },
  ];

  const additionalFilters_HyperScalarAdvisor = [
    {
      label: "Service Category(s)",
      name: "Select Service Category",
      options: [
        { value: "Service Category 1", label: "Service Category 1" },
        { value: "Service Category 2", label: "Service Category 2" },
        { value: "Service Category 3", label: "Service Category 3" },
      ],
    },
    {
      label: "Owner(s)",
      name: "Select Owner",
      options: [
        { value: "Owner 1", label: "Owner 1" },
        { value: "Owner 2", label: "Owner 2" },
        { value: "Owner 3", label: "Owner 3" },
      ],
    },
    {
      label: "Environment(s)",
      name: "environments",
      options: [
        { value: "Production", label: "Production" },
        { value: "Staging", label: "Staging" },
        { value: "Development", label: "Development" },
      ],
    },
    {
      label: "Cost Center(s)",
      name: "Select Cost Center",
      options: [
        { value: "Cost Center1", label: "Cost Center1" },
        { value: "Cost Center2", label: "Cost Center2" },
        { value: "Cost Center3", label: "Cost Center3" },
      ],
    },
  ];

  // HyperScalarAdvisor ends

  //SqlVmLicenses

  const bars_SqlVmLicenses = [
    {
      dataKey: "On Demand Cost",
      fill: "#2CAFFE",
      name: "On Demand Cost",
      barSize: 20,
    },
    {
      dataKey: "Consumed Meter",
      fill: "#330072",
      name: "Consumed Meter",
      barSize: 20,
    },
  ];

  const tableData_SqlVmLicenses = [
    {
      tableTitle: "On Demand Cost Allocation for licenses",
      columnHead1: "Item Name",
      columnHead2: " SQL Server License Type ",
      columnHead3: " Total Cost",
      columnHead4: " Owner name",
      columnHead5: "Application ",
      columnHead6: "Environment",
    },
  ];

  const dummyData_SqlVmLicenses = [
    {
      name: "Virtual Machine",
      totalBill: "$400",
      onDemandCost: "$100",
      commitmentsCost: "$200",
      savings: "$50",
      budget: "10",
      services: [
        {
          name: "VM1",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG1",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM1-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM1-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG2",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM2-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM2-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "VM2",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG3",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM3-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM3-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG4",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM4-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM4-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Storage",
      totalBill: "$300",
      onDemandCost: "$120",
      commitmentsCost: "$180",
      savings: "$60",
      budget: "10",
      services: [
        {
          name: "Storage1",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG5",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage1-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage1-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG6",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage2-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage2-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "Storage2",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG7",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage3-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage3-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG8",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage4-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage4-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const data_SqlVmLicenses = [
    {
      name: "Subscription 1",
      "On Demand Cost": 400000,
      "Consumed Meter": 50000,
    },
    {
      name: "Subscription 2",
      "On Demand Cost": 250000,
      "Consumed Meter": 80000,
    },
    {
      name: "Subscription 3",
      "On Demand Cost": 90000,
      "Consumed Meter": 10000,
    },
    {
      name: "Subscription 4",
      "On Demand Cost": 50000,
      "Consumed Meter": 115000,
    },
    {
      name: "Subscription 5",
      "On Demand Cost": 25000,
      "Consumed Meter": 100000,
    },
    {
      name: "Subscription 6",
      "On Demand Cost": 15000,
      "Consumed Meter": 75000,
    },
  ];

  const data1_SqlVmLicenses = [
    { name: "AHUB", value: Math.floor(Math.random() * 100), color: "#0099C6" },
    { name: "DR", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    { name: "PAYGO", value: Math.floor(Math.random() * 100), color: "#FFCD00" },
    {
      name: "Windows_Server",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "SLES_BYOS",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const data2_SqlVmLicenses = [
    {
      name: "AHUB",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    {
      name: "DR",
      value: Math.floor(Math.random() * 100),
      color: "#BA741A",
    },
    {
      name: "PAYGO",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Windows_Server",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "SLES_BYOS",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const dataSet1_SqlVmLicenses = [
    { number: "20", text: "Total Count Of AHUB License" },
    { number: "10", text: "Total count Of PAYGO License" },
  ];

  const additionalFilters_SqlVmLicenses = [
    {
      label: "Service Category(s)",
      name: "Select Service Category",
      options: [
        { value: "Service Category 1", label: "Service Category 1" },
        { value: "Service Category 2", label: "Service Category 2" },
        { value: "Service Category 3", label: "Service Category 3" },
      ],
    },
    {
      label: "Owner(s)",
      name: "Select Owner",
      options: [
        { value: "Owner 1", label: "Owner 1" },
        { value: "Owner 2", label: "Owner 2" },
        { value: "Owner 3", label: "Owner 3" },
      ],
    },
    {
      label: "Environment(s)",
      name: "environments",
      options: [
        { value: "Production", label: "Production" },
        { value: "Staging", label: "Staging" },
        { value: "Development", label: "Development" },
      ],
    },
    {
      label: "Cost Center(s)",
      name: "Select Cost Center",
      options: [
        { value: "Cost Center1", label: "Cost Center1" },
        { value: "Cost Center2", label: "Cost Center2" },
        { value: "Cost Center3", label: "Cost Center3" },
      ],
    },
  ];

  //SqlVmLicenses ends

  //OrphanedRSVBackups
  const dataSet1_OrphanedRSVBackups = [
    { number: "50", text: "Count of Unhealthy Backups" },
    { number: "10", text: "Count of Orphan Backups" },
  ];

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
      columnHead1: "Item Name",
      columnHead2: " Protection Status ",
      columnHead3: " Protection State",
      columnHead4: " Application",
      columnHead5: "Retention Period ",
      columnHead6: "Last backup Date",
      columnHead7: "Archive Enabled",
    },
  ];
  const dummyData_OrphanedRSVBackups = [
    {
      name: "Virtual Machine",
      totalBill: "$400",
      onDemandCost: "$100",
      commitmentsCost: "$200",
      savings: "$50",
      budget: "10",
      services: [
        {
          name: "VM1",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG1",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM1-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM1-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG2",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM2-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM2-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "VM2",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG3",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM3-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM3-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG4",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM4-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM4-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Storage",
      totalBill: "$300",
      onDemandCost: "$120",
      commitmentsCost: "$180",
      savings: "$60",
      budget: "10",
      services: [
        {
          name: "Storage1",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG5",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage1-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage1-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG6",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage2-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage2-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "Storage2",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG7",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage3-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage3-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG8",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage4-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage4-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
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

  //OrphanedRSVBackups ends
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
          onMonthChange={handleMonthChange}
          currencySymbol={currencySymbol}
          currencyPreference={currencyPreference}
          loading={loading}
        />
      )}
      {activeSection === "sqlVmLicenses" && (
        <SqlVmLicenses
          additionalFilters={additionalFilters_SqlVmLicenses}
          tableData={tableData_SqlVmLicenses}
          dummyData={dummyData_SqlVmLicenses}
          dataSet1={dataSet1_SqlVmLicenses}
          data={data_SqlVmLicenses}
          data1={data1_SqlVmLicenses}
          data2={data2_SqlVmLicenses}
          bars={bars_SqlVmLicenses}
        />
      )}
      {activeSection === "orphanedRSVBackups" && (
        <OrphanedRSVBackups
          tableData={tableData_OrphanedRSVBackups}
          dummyData={dummyData_OrphanedRSVBackups}
          dataSet1={dataSet1_OrphanedRSVBackups}
          data1={data1_OrphanedRSVBackups}
          bars={bars_OrphanedRSVBackups}
          horizontaldata={horizontaldata_OrphanedRSVBackups}
        />
      )}
    </div>
  );
};

export default RecommendationSPA;

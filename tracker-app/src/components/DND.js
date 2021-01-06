// const itemsFromBack = [
  //   { id: uuid(), content: "First task" },
  //   { id: uuid(), content: "Second task" },
  //   { id: uuid(), content: "Third task" },
  //   { id: uuid(), content: "Fourth task" },
  // ];

//   const statusColumns = {
//     [uuid()]: { name: "Interested", items: [] },
//     [uuid()]: { name: "Applied", items: [] },
//     [uuid()]: { name: "Reached out", items: [] },
//     [uuid()]: { name: "Interview", items: [] },
//     [uuid()]: { name: "Offer", items: [] },
//     [uuid()]: { name: "Not moving forward", items: [] },
//   };

//   const onDragEnd = (result, columns, setColumns) => {
//     if (!result.destination) return;
//     const { source, destination } = result;

//     if (source.droppableId !== destination.droppableId) {
//       const sourceColumn = columns[source.droppableId];
//       const destColumn = columns[destination.droppableId];
//       const sourceItems = [...sourceColumn.items];
//       const destItems = [...destColumn.items];
//       const [removed] = sourceItems.splice(source.index, 1);
//       destItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...sourceColumn,
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...destColumn,
//           items: destItems,
//         },
//       });
//     } else {
//       const column = columns[source.droppableId];
//       const copiedItems = [...column.items];
//       const [removed] = copiedItems.splice(source.index, 1);
//       copiedItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...column,
//           items: copiedItems,
//         },
//       });
//     }
//   };

{/* <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        ></DragDropContext> */}
{/* {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <h2>{column.name}</h2>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightgray"
                                : null,
                              padding: 4,
                              width: 250,
                              minHeight: 500,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.jobTitle}
                                        Test
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })} */}
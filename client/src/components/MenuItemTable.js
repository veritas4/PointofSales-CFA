import React, { useState,useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

const columns = [
  {
    accessorFn: (row) => row.itemname, //accessorFn used to join multiple data into a single cell
    id: 'menuItem', //id is still required when using accessorFn instead of accessorKey
    header: 'Menu Item',
    size: 250,
    Cell: ({ renderedCellValue, row }) => (  
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
      <Button variant = "contained"
        onClick={() => {
          alert(row.original.itemname) 
          axios.get(`http://localhost:3001/addItem?menuitem=` + row.original.itemname, config)
          .then(res => {
          console.log("Howdy")
          console.log(res.data);
          })
          .catch((err) => {
          console.error(err);
          });
          }
        }>
        Add Item
        </Button>
      <img
        alt="avatar"
        height={50}
        src={(row.original.imageLink)}
        loading="lazy"
        style={{ borderRadius: '50%' }}
      />
        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
        <span>{renderedCellValue}</span>
      </Box>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price($)',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },

];

const MenuItemTable = () => {

  const [MenuData, setMenuData] = useState([]);

  useEffect(() => {
    const getAllMenu = async() => {
        axios.get(`http://localhost:3001/serverPage`, config)
        .then(res => {
          const menuData = res.data;
          setMenuData(menuData);
          //console.log(menuData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getAllMenu()
  },[])

  const getEntrees = async() => {
    axios.get(`http://localhost:3001/serverPage/getEntrees`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const getSides = async() => {
    axios.get(`http://localhost:3001/serverPage/getSides`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const getDesserts = async() => {
    axios.get(`http://localhost:3001/serverPage/getDesserts`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  
    return (
    <div>
        <Button 
        variant = "outlined" 
        style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}
        onClick={getEntrees}
        >
          <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
          <lord-icon
              src="https://cdn.lordicon.com/xnfkhcfn.json"
              trigger="hover"
              colors="primary:#c71f16,secondary:#121331"
              style={{width:'75px' ,height:'75px'}}>
          </lord-icon>
          <p>
          Entrees
          </p>
        </Button>   
        <Button 
        variant = "outlined" 
        style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}
        onClick = {getSides}
        >
          <div align = "center">
            <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
            <lord-icon
                src="https://cdn.lordicon.com/fkytfmrm.json"
                trigger="hover"
                colors="primary:#121331,secondary:#c71f16"
                style={{width:'75px',height:'75px'}}>
            </lord-icon>
            <p>
            Sides
            </p>
          </div>
        </Button>
        <Button 
        variant = "outlined" 
        style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}
        onClick = {getDesserts}
        >
          <div align = "center">
          <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
          <lord-icon
              src="https://cdn.lordicon.com/elzyzcar.json"
              trigger="hover"
              colors="primary:#121331,secondary:#c71f16"
              style={{width:'75px',height:'75px'}}>
          </lord-icon>
          <p>
          Desserts
          </p>
          </div>
        </Button>
      <MaterialReactTable 
      columns={columns} 
      data={MenuData} 
      displayColumnDefOptions={{
        'mrt-row-numbers': {
          size: 10,
        },
        'mrt-row-expand': {
          size: 10,
        },
      }}
      

      muiTableHeadCellProps={{
      //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          fontSize: '25px',
        }, 
      }}

      muiTableBodyCellProps={{
        sx: {
          fontSize : '18px'
        }
      }}
    />
    </div>
    );
};

export default MenuItemTable;
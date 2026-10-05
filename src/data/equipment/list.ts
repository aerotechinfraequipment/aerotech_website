import s40TelescopicBoomLift from '../../assets/images/S-40 Telescopic Boom Lift.jpg';
import s45TelescopicBoomLift from '../../assets/images/S-45 Telescopic Boom Lift.jpg';
import s60TelescopicBoomLift from '../../assets/images/S-60 Telescopic Boom Lift.jpg';
import s65TelescopicBoomLift from '../../assets/images/S-65 Telescopic Boom Lift.jpg';
import s80TelescopicBoomLift from '../../assets/images/S-80 Telescopic Boom Lift.jpg';
import s85TelescopicBoomLift from '../../assets/images/S-85 Telescopic Boom Lift.jpg';
import sx125XCTelescopicBoomLift from '../../assets/images/SX-125 XC Telescopic Boom Lift.jpg';
import sx135XCTelescopicBoomLift from '../../assets/images/SX-135 XC Telescopic Boom Lift.jpg';
import lift460SJTelescopicBoomLift from '../../assets/images/460SJ Telescopic Boom Lift.webp';
import lift600SJTelescopicBoomLift from '../../assets/images/600SJ Telescopic Boom Lift.webp';
import lift860SJTelescopicBoomLift from '../../assets/images/860SJ Telescopic Boom Lift.webp';
import lift1200SJTelescopicBoomLift from '../../assets/images/1200SJ Telescopic Boom Lift.webp';
import lift1350SJPTelescopicBoomLift from '../../assets/images/1350SJP Telescopic Boom Lift.webp';
import z3020ArticulatedBoomLift from '../../assets/images/Z-30:20 Articulated Boom Lift.jpg';
import z3422ArticulatedBoomLift from '../../assets/images/Z-34:22 Articulated Boom Lift.jpg';
import z45ArticulatedBoomLift from '../../assets/images/Z-45 Articulated Boom Lift.jpg';
import z60ArticulatedBoomLift from '../../assets/images/Z-60 Articulated Boom Lift.jpg';
import z6240ArticulatedBoomLift from '../../assets/images/Z-62:40 Articulated Boom Lift.jpg';
import z8060ArticulatedBoomLift from '../../assets/images/Z-80:60 Articulated Boom Lift.jpg';
import zx13570ArticulatedBoomLift from '../../assets/images/ZX-135:70 Articulated Boom Lift.jpg';
import lift450AJArticulatedBoomLift from '../../assets/images/450AJ Articulated Boom Lift.webp';
import lift520AJArticulatedBoomLift from '../../assets/images/520AJ Articulated Boom Lift.webp';
import lift600AJArticulatedBoomLift from '../../assets/images/600AJ Articulated Boom Lift.webp';
import lift800AJArticulatedBoomLift from '../../assets/images/800AJ Articulated Boom Lift.webp';
import lift1250AJPArticulatedBoomLift from '../../assets/images/1250AJP Articulated Boom Lift.webp';
import gs2669RTScissorLift from '../../assets/images/GS-2669 RT Rough Terrain Scissor Lift.jpg';
import gs3369RTScissorLift from '../../assets/images/GS-3369 RT Rough Terrain Scissor Lift.jpg';
import gs4069RTScissorLift from '../../assets/images/GS-4069 RT Rough Terrain Scissor Lift.jpg';
import gs5390RTScissorLift from '../../assets/images/GS-5390 RT Rough Terrain Scissor Lift.jpg';
import sy870HExcavator from '../../assets/images/SY870H Large excavator.webp';
import sy980HExcavator from '../../assets/images/SY980H Large Excavator.webp';
import stc250T5TruckCrane from '../../assets/images/STC250T5 25T Truck Crane.webp';
import sac600EAllTerrainCrane from '../../assets/images/SAC600E Euro V 60T All-terrain Crane.jpg';
import sac1200EAllTerrainCrane from '../../assets/images/SAC1200E 120T All-terrain Crane.webp';
import sac1600T7AllTerrainCrane from '../../assets/images/SAC1600T7 160T All-terrain Crane.webp';
import sac2000T8AllTerrainCrane from '../../assets/images/SAC2000T8 200T All-terrain Crane.webp';
import sac2500C88AllTerrainCrane from '../../assets/images/SAC2500C8-8 250T All-terrain Crane.webp';
import sac3000T88AllTerrainCrane from '../../assets/images/SAC3000T8-8 300t All-terrain Crane.webp';

export interface Equipment {
    id: string,
    name: string,
    image: string,
    brand: string,
    category: string,
    category_formated: string,
    description: string
    rentalType: string,
    status: 'available' | 'rented'
    models: string[],
    can_show_in_home?: boolean
}
export const equipments: Equipment[] = [
  // Genie boom lifts
  {
    id: 'genie-boom-lift-s40',
    name: "S-40 Telescopic Boom Lift",
    image: s40TelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'The Genie® S®-40 telescopic boom is able to perform a wider range of heavier lift tasks on construction and industrial jobsites, offering a dual lift capacity of 660 lb (300 kg) unrestricted and 1,000 lb (454 kg) restricted and up to three people on board.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['S-40 XC', 'S-40 TraX', 'S-40 HF']
  },
  {
    id: 'genie-boom-lift-s45',
    name: "S-45 Telescopic Boom Lift",
    image: s45TelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'The Genie® S®-45 telescopic boom is able to perform a wider range of heavier lift tasks on construction and industrial jobsites, offering a dual lift capacity of 660 lb (300 kg) unrestricted and 1,000 lb (454 kg) restricted and up to three people on board.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['S-45 XC', 'S-45 TraX', 'S-45 HF']
  },
  {
    id: 'genie-boom-lift-s60',
    name: "S-60 Telescopic Boom Lift",
    image: s60TelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'The Genie® S®-60 boom lift offers the same performance of a 4x4 diesel machine in a clean, quiet electric boom. The ultra-efficient electric AC drive motors allow for a full day\'s performance on a single battery charge, making it an ideal, eco-friendly solution for a number of outdoor and indoor applications on construction sites, facilities, malls, sports arenas, and also challenging pedestrian areas.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['S-60 DC', 'S-60 FE', 'S-60 J']
  },
  {
    id: 'genie-boom-lift-s65',
    name: "S-65 Telescopic Boom Lift",
    image: s65TelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'Genie® S®-65 telescopic boom lift can perform a wider range of heavier lift tasks on construction and industrial jobsites thanks to their dual lift capacity and offer innovative features to help increase jobsite efficiency.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['S-65 XC', 'S-65 TraX', 'S-65 HF'],
    can_show_in_home: true
  },
  {
    id: 'genie-boom-lift-s80',
    name: "S-80 Telescopic Boom Lift",
    image: s80TelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'The Genie® S®-80 J telescopic boom offers the essential performance that operators need to get work done at height. It offers the right solution to get work done at height, including leading unrestricted platform capacity of 660 lb (300 kg), allowing for two occupants plus tools.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['S-80 J', 'S-80 J TraX']
  },
  {
    id: 'genie-boom-lift-s85',
    name: "S-85 Telescopic Boom Lift",
    image: s85TelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'The Genie® S®-85 telescopic boom offers the essential performance that operators need to get work done at height. It offers the right solution to get work done at height, including leading unrestricted platform capacity of 660 lb (300 kg), allowing for two occupants plus tools.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['S-85 XC', 'S-85 XC FE', 'S-85 XC E', 'S-85 HF']
  },
  {
    id: 'genie-boom-lift-sx125xc',
    name: "SX-125 XC Telescopic Boom Lift",
    image: sx125XCTelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'Perfect for heavy lifting in construction, bridge inspections and maintenance, stadium and sports arena, oil and gas, industrial, telecommunications and utility applications, the Genie® SX-125 XC™ telescopic boom works in more applications that require higher capacities thanks to its industry-leading dual lift capacity — 660-lb (300 kg)/1,000-lb (454 kg)',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'genie-boom-lift-sx135xc',
    name: "SX-135 XC Telescopic Boom Lift",
    image: sx135XCTelescopicBoomLift,
    brand: 'Genie',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'The Genie® SX-135 XC™ telescopic boom delivers industry-leading outreach and capacity through the full working envelope for incredible operational versatility and accessibility. It boasts 660 lb/1,000 lb (300/454 kg)** dual platform capacity with a smooth range of motion envelope to lift heavy loads in the most challenging jobsite applications.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
// JLG boom lifts
  {
    id: 'jlg-boom-lift-460sj',
    name: "460SJ Telescopic Boom Lift",
    image: lift460SJTelescopicBoomLift,
    brand: 'JLG',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'Experience a productivity boost with 400 Series telescopic boom lifts. These telescoping lifts offer the fastest lift and drive speeds in their class while delivering more reach.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'jlg-boom-lift-600sj',
    name: "600SJ Telescopic Boom Lift",
    image: lift600SJTelescopicBoomLift,
    brand: 'JLG',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: '600 Series telescopic boom lifts have a powerful combination of performance and reliability so you can conquer all your worksite challenges.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',  
    models: []
  },
  {
    id: 'jlg-boom-lift-860sj',
    name: "860SJ Telescopic Boom Lift",
    image: lift860SJTelescopicBoomLift,
    brand: 'JLG',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'Go from the ground to 80 ft in less than 67 seconds – that 40% faster than the competition. 800 Series telescopic boom lifts deliver increased horizontal outreach, more platform capacity and job-proven performance.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'jlg-boom-lift-1200sj',
    name: "1200SJ Telescopic Boom Lift",
    image: lift1200SJTelescopicBoomLift,
    brand: 'JLG',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'Dominate the job site with JLG® Ultra Series telescopic boom lifts. When you\'re working twelve stories high or more, you want a telescopic boom lift that\'s built to perform, and that\'s exactly what you get with the Ultra Series.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'jlg-boom-lift-1350sjp',
    name: "1350SJP Telescopic Boom Lift",
    image: lift1350SJPTelescopicBoomLift,
    brand: 'JLG',
    category: 'boom-lift',
    category_formated: 'Boom Lift',
    description: 'Dominate the job site with JLG® Ultra Series telescopic boom lifts. When you\'re working twelve stories high or more, you want a telescopic boom lift that\'s built to perform, and that\'s exactly what you get with the Ultra Series.',
    rentalType: 'Daily, Weekly & Monthly Rental', 
    status: 'available',
    models: []
  },

  // Genie Articulated Boom Lifts
  {
    id: 'genie-articulated-boom-lift-z30',
    name: "Z-30/20 Articulated Boom Lift",
    image: z3020ArticulatedBoomLift,
    brand: 'Genie',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The Genie® Z®-30/20 articulating boom lift is the compact, quiet, zero-emission machine that launched Genie into the rental segment in 1985. Its distinctive "up-and-over" capability lets operators navigate around obstacles indoors and outdoors with ease.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['Z-30/20 N', 'Z-30/20 N RJ']
  },
  {
    id: 'genie-articulated-boom-lift-z34',
    name: "Z-34/22 Articulated Boom Lift",
    image: z3422ArticulatedBoomLift,
    brand: 'Genie',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The Genie® Z®-34/22 IC articulating boom lift combines outstanding up, out and over positioning capability with a compact machine design. Available in bi-energy and diesel configurations, it is ideal for both sensitive indoor environments and rugged outdoor jobsites.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['Z-34/22 IC', 'Z-34/22 BiE']
  },
  {
    id: 'genie-articulated-boom-lift-z45',
    name: "Z-45 Articulated Boom Lift",
    image: z45ArticulatedBoomLift,
    brand: 'Genie',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The Genie® Z®-45 articulating boom lift is one of the most versatile aerial work platforms available, offering outstanding up, out and over positioning capability. Available in electric, diesel, bi-energy and Xtra Capacity™ configurations to suit any jobsite requirement.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['Z-45 XC', 'Z-45 DC', 'Z-45 FE', 'Z-45/25J', 'Z-45/25 RT']
  },
  {
    id: 'genie-articulated-boom-lift-z60',
    name: "Z-60 Articulated Boom Lift",
    image: z60ArticulatedBoomLift,
    brand: 'Genie',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The Genie® Z®-60 articulating boom lift offers the same performance of a 4×4 diesel machine in a clean, quiet electric or hybrid package. Its Genie FastMast™ system delivers industry-leading speed from ground to working height, maximising productivity on construction and industrial sites.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['Z-60 DC', 'Z-60 FE']
  },
  {
    id: 'genie-articulated-boom-lift-z62',
    name: "Z-62/40 Articulated Boom Lift",
    image: z6240ArticulatedBoomLift,
    brand: 'Genie',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The Genie® Z®-62/40 articulating boom lift delivers a best-in-class combination of working height and horizontal reach. With 360° continuous turntable rotation and the Genie FastMast™ system, it excels at large-scale construction, industrial maintenance and utilities applications.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['Z-62/40']
  },
  {
    id: 'genie-articulated-boom-lift-z80',
    name: "Z-80/60 Articulated Boom Lift",
    image: z8060ArticulatedBoomLift,
    brand: 'Genie',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The Genie® Z®-80/60 articulating boom lift delivers outstanding outreach and up-and-over positioning at significant working heights. Its four-wheel drive, active oscillating axle and dual-capacity design make it ideal for the most demanding construction and industrial applications.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['Z-80/60']
  },
  {
    id: 'genie-articulated-boom-lift-zx135',
    name: "ZX-135/70 Articulated Boom Lift",
    image: zx13570ArticulatedBoomLift,
    brand: 'Genie',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The Genie® ZX™-135/70 articulating boom lift sets the class benchmark with its telescoping Jib-Extend™ jib, XChassis™ expanding axle system and 360° continuous turntable rotation. It delivers class-leading working height and horizontal reach for the most complex jobsite positioning challenges.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['ZX-135/70']
  },
  {
    id: 'jlg-articulated-boom-lift-450aj',
    name: "450AJ Articulated Boom Lift",
    image: lift450AJArticulatedBoomLift,
    brand: 'JLG',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The 450 Series provides the perfect solution for when you\'re working around tricky architecture or in smaller spaces where access can be limited.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'jlg-articulated-boom-lift-520aj', 
    name: "520AJ Articulated Boom Lift",
    image: lift520AJArticulatedBoomLift,
    brand: 'JLG',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The 520AJ gives operator productivity a boost thanks to 50% faster elevation time and half a meter more of horizontal reach.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'jlg-articulated-boom-lift-600aj', 
    name: "600AJ Articulated Boom Lift",
    image: lift600AJArticulatedBoomLift,
    brand: 'JLG',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'The 600 Series features a narrow chassis option for access to confined areas and the industry\'s best work envelope. A standard oscillating axle and optional four-wheel drive give you outstanding drive performance on rough terrain.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: [],
    can_show_in_home: true
  },
  {
    id: 'jlg-articulated-boom-lift-800aj', 
    name: "800AJ Articulated Boom Lift",
    image: lift800AJArticulatedBoomLift,
    brand: 'JLG',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'Whether you\'re venturing on or off rough terrain, the 800 Series lets you reach higher and get to your work faster. Our exclusive QuikStik® boom takes you from the ground to 80 ft (24.38 m) in less than 50 seconds. And with it\'s exceptional reach envelope – 32 ft (9.75 m) of up and over and up to 53 ft (16.15 m) of outreach – there\'s no obstacle you can\'t handle.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'jlg-articulated-boom-lift-1250ajp', 
    name: "1250AJP Articulated Boom Lift",
    image: lift1250AJPArticulatedBoomLift,
    brand: 'JLG',
    category: 'articulated-boom-lift',
    category_formated: 'Articulated Boom Lift',
    description: 'When you are working at twelve stories or more, you need a machine that you can trust. The JLG® Articulating Ultra Series has some of the largest working ranges in the industry, with the highest platform capacity.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },

  // Genie rough terrain scissor lifts
  {
    id: 'genie-scissor-lift-gs2669rt',
    name: 'GS-2669 RT Rough Terrain Scissor Lift',
    image: gs2669RTScissorLift,
    brand: 'Genie',
    category: 'scissor-lift',
    category_formated: 'Scissor Lift',
    description: 'The Genie® GS™-2669 RT rough terrain scissor lift offers competitive lift speed and a large platform to increase efficiency on outdoor jobsites. With exceptional traction, speed and gradeability, it is the perfect machine for big outdoor jobs where platform workspace is critical.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['GS-2669 RT', 'GS-2669 DC']
  },
  {
    id: 'genie-scissor-lift-gs3369rt',
    name: 'GS-3369 RT Rough Terrain Scissor Lift',
    image: gs3369RTScissorLift,
    brand: 'Genie',
    category: 'scissor-lift',
    category_formated: 'Scissor Lift',
    description: 'The Genie® GS™-3369 RT rough terrain scissor lift is designed for productivity in demanding outdoor environments. It features the ability to drive and function at full height, delivering exceptional traction and gradeability for construction and industrial applications.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['GS-3369 RT']
  },
  {
    id: 'genie-scissor-lift-gs4069rt',
    name: 'GS-4069 RT Rough Terrain Scissor Lift',
    image: gs4069RTScissorLift,
    brand: 'Genie',
    category: 'scissor-lift',
    category_formated: 'Scissor Lift',
    description: 'The Genie® GS™-4069 RT rough terrain scissor lift is the only 40 ft full-drive-height unit in its class, offering up to 40% gradeability. Its four-wheel drive and active oscillating axle make it ideal for the most demanding outdoor construction sites.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['GS-4069 RT', 'GS-4069 DC'],
    can_show_in_home: true
  },
  {
    id: 'genie-scissor-lift-gs5390rt',
    name: 'GS-5390 RT Rough Terrain Scissor Lift',
    image: gs5390RTScissorLift,
    brand: 'Genie',
    category: 'scissor-lift',
    category_formated: 'Scissor Lift',
    description: 'The Genie® GS™-5390 RT rough terrain scissor lift is a tough, four-wheel drive machine featuring positive traction control, optimised for demanding outdoor performance. Built for high-productivity worksites, it delivers the platform workspace and reliability needed for the most challenging outdoor applications.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: ['GS-5390 RT']
  },
  // Excavator
  {
    id: 'sany-excavator-sy870h',
    name: 'SY870H Large excavator',
    image: sy870HExcavator,
    brand: 'Sany',
    category: 'excavator',
    category_formated: 'Excavator',
    description: 'More than 20 kinds of optional working devices, good engine protection with a multi-stage reinforced fuel filter system. Much more convenient maintenance operation, durable oil and filters to reach more extended maintenance period and 50% less expense. The longest designed lifetime can reach 25000 hours, 30% longer than previous models. Adopt optimized engine, pump, and valve matching technology to improve energy transfer efficiency, lower fuel consumption, and achieve higher efficiency.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: [],
    can_show_in_home: true
  },
  {
    id: 'sany-excavator-sy980h',
    name: 'SY980H Large Excavator',
    image: sy980HExcavator,
    brand: 'Sany',
    category: 'excavator',
    category_formated: 'Excavator',
    description: 'More than 20 kinds of optional working devices, good engine protection with a multi-stage reinforced fuel filter system. The longest designed lifetime can reach 25000 hours, 30% longer than previous models. Much more convenient maintenance operation, durable oil and filters to reach more extended maintenance period and 50% less expense. Adopt optimized engine, pump, and valve matching technology to improve energy transfer efficiency, lower fuel consumption, and achieve higher efficiency.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  // Crane
  {
    id: 'sany-crane-stc250t5',
    name: 'STC250T5 25T Truck Crane',
    image: stc250T5TruckCrane,
    brand: 'Sany',
    category: 'crane',
    category_formated: 'Crane',
    description: 'More than 20 kinds of optional working devices, good engine protection with a multi-stage reinforced fuel filter system. The longest designed lifetime can reach 25000 hours, 30% longer than previous models. Much more convenient maintenance operation, durable oil and filters to reach more extended maintenance period and 50% less expense. Adopt optimized engine, pump, and valve matching technology to improve energy transfer efficiency, lower fuel consumption, and achieve higher efficiency.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: [],
    can_show_in_home: true
  },
  {
    id: 'sany-crane-sac600e',
    name: 'SAC600E Euro V 60T All-terrain Crane',
    image: sac600EAllTerrainCrane,
    brand: 'Sany',
    category: 'crane',
    category_formated: 'Crane',
    description: 'Compact chassis features all wheel steering and better suspension, adaptable for various jobsites. Variable jib configurations and counterweight combinations. We always provide the most economical solution for different lifting projects. The single-cylinder pin system provides variable boom combinations for variable constructions. The cranes are capable of traveling with counterweight at jobsites, requiring less transport trailers.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'sany-crane-sac1200e',
    name: 'SAC1200E 120T All-terrain Crane',
    image: sac1200EAllTerrainCrane,
    brand: 'Sany',
    category: 'crane',
    category_formated: 'Crane',
    description: 'Compact chassis features all wheel steering and better suspension, adaptable for various jobsites. Variable jib configurations and counterweight combinations. We always provide the most economical solution for different lifting projects. The single-cylinder pin system provides variable boom combinations for variable constructions. The cranes are capable of traveling with counterweight at jobsites, requiring less transport trailers.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'sany-crane-sac1600t7',
    name: 'SAC1600T7 160T All-terrain Crane',
    image: sac1600T7AllTerrainCrane,
    brand: 'Sany',
    category: 'crane',
    category_formated: 'Crane',
    description: 'Compact chassis features all wheel steering and better suspension, adaptable for various jobsites. Variable jib configurations and counterweight combinations. We always provide the most economical solution for different lifting projects. The single-cylinder pin system provides variable boom combinations for variable constructions. The cranes are capable of traveling with counterweight at jobsites, requiring less transport trailers.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'sany-crane-sac2000t8',
    name: 'SAC2000T8 200T All-terrain Crane',
    image: sac2000T8AllTerrainCrane,
    brand: 'Sany',
    category: 'crane',
    category_formated: 'Crane',
    description: 'The cranes are designed with greater lifting capacity to operate at oil & gas field, chemical plant, bridges, and wind farm. Compact chassis features all-wheel steering and better suspension, making them adaptable for various job sites. The cranes can travel with counterweight at job sites, requiring fewer transport trailers. The single-cylinder pin system provides variable boom combinations for variable constructions. Variable jib configurations and counterweight combinations. We always provide the most economical solution for different lifting projects.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'sany-crane-sac2500c8-8',
    name: 'SAC2500C8-8 250T All-terrain Crane',
    image: sac2500C88AllTerrainCrane,
    brand: 'Sany',
    category: 'crane',
    category_formated: 'Crane',
    description: 'The cranes are designed with greater lifting capacity to operate at oil & gas field, chemical plant, bridges, and wind farm. Compact chassis features all-wheel steering and better suspension, making them adaptable for various job sites. The cranes can travel with counterweight at job sites, requiring fewer transport trailers. The single-cylinder pin system provides variable boom combinations for variable constructions. Variable jib configurations and counterweight combinations. We always provide the most economical solution for different lifting projects.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  },
  {
    id: 'sany-crane-sac3000t8-8',
    name: 'SAC3000T8-8 300t All-terrain Crane',
    image: sac3000T88AllTerrainCrane,
    brand: 'Sany',
    category: 'crane',
    category_formated: 'Crane',
    description: 'The cranes are designed with greater lifting capacity to operate at oil & gas field, chemical plant, bridges, and wind farm. Compact chassis features all-wheel steering and better suspension, making them adaptable for various job sites. The cranes can travel with counterweight at job sites, requiring fewer transport trailers. The single-cylinder pin system provides variable boom combinations for variable constructions. Variable jib configurations and counterweight combinations. We always provide the most economical solution for different lifting projects.',
    rentalType: 'Daily, Weekly & Monthly Rental',
    status: 'available',
    models: []
  }

];
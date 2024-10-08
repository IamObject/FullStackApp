// ng generate component xyz
// ng add @angular/material
// ng add @angular/pwa
// ng add _____
// ng test
// ng build

// ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.editMode = params['id'] != null;
    //   this.initForm();
    // });

     // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],


    // ,'Access-Control-Allow-Origin': 'http://localhost:4200',
  // 'Access-Control-Allow-Methods' : 'GET,PUT,OPTIONS',
  // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'}

  //col-sm-8	col-md-8	col-lg-8	col-xl-8

  //leftcomponent
//   <aside id="sidebar" infinite-scroll 
// (scrolled)="getNextPage()"  (scrolledUp)="getPreviousPage()" [scrollWindow]="false" class="sidebar toggle-sidebar-btn">

//   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//     Launch static backdrop modal
//   </button>


// <div class="row formComments1" >
//   <div>
//     <div class="d-flex align-items-center justify-content-between">
//       <a href="index.html" class="logo d-flex align-items-center" routerLink="/home">
//         <img src="assets/template/img/logo.png" alt="">
//         <span class="d-none d-lg-block">Home</span>
//       </a>
//     </div>

//     <div *ngIf="globals.appName === globals.comment">
//       <button class="btn btn-success" style="margin-top: 5px;" (click)="addSubject()">
//         <div>lbl-add-subject</div>
//       </button>
//       <button class="btn btn-success" style="margin-left:5px;margin-top: 5px;" (click)="addQuestion()">
//         <div>lbl-add-subject</div>
//       </button>
//     </div>

//     <div *ngIf="globals.appName === globals.recipe">
//       <button class="btn btn-success" style="margin-left:5px;margin-top: 5px;" (click)="addRecipe()">
//         <div>Add Recipe</div>
//       </button>

//     </div>



//     <div class="main-panel">

//       <!-- <form class="form-inline my-2 my-lg-0"> -->
//       <input (keyup)="searchSubject($event)" class="form-control mr-sm-2" type="search" style="margin-top: 5px;"
//         placeholder="Search Subject" aria-label="Search">
//       <!-- <button class="btn btn-outline-success my-2 my-sm-0" >Search </button> -->
//     </div>



//     <h1> <button class="btn btn-link" style="color:green" (click)="getPreviousPage()">
//         <div>Previous</div>
//       </button>
//       <button class="btn btn-link" style="color:green;margin-left: 100px;" (click)="getNextPage()">
//         <div>Next</div>
//       </button>
//     </h1>
//     <!-- <nav class="small" id="toc"> -->
//     <!-- <h2 class="h6 pt-4 pb-3">
//         <div>Subject Id</div>
//         <div>{{this.localizationService.localizationStr["lbl-subjects"]}}</div>
//       </h2> -->
//     <ul class="list-unstyled" *ngFor="let subject of subjects">
//       <li class="my-2">
//         <!-- <a class="text-center" (click)="redirectTo('home/userhome/question',subject.id)" > {{ subject.subject}}</a> -->
//         <!-- <button (click)="redirectTo('/userDashboard/questions',subject.id)" class="btn d-inline-flex align-items-center collapsed" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#contents-collapse" aria-controls="contents-collapse">{{subject.id}}{{" "}}{{ subject.subject}}</button> -->
//         <button (click)="getListOf('/userDashboard/recipeList',subject.id)"
//           class="btn d-inline-flex align-items-center collapsed" data-bs-toggle="collapse" aria-expanded="false"
//           data-bs-target="#contents-collapse" aria-controls="contents-collapse">{{"("}}{{subject.id}}{{")"}}{{" "}}{{
//           subject.subject}}</button>
//         <!-- <ul class="list-unstyled ps-3 collapse" id="contents-collapse">
//               <li><a class="d-inline-flex align-items-center rounded" href="#typography">Typography</a></li>
//               <li><a class="d-inline-flex align-items-center rounded" href="#images">Images</a></li>
//               <li><a class="d-inline-flex align-items-center rounded" href="#tables">Tables</a></li>
//               <li><a class="d-inline-flex align-items-center rounded" href="#figures">Figures</a></li>
//             </ul> -->
//       </li>
//     </ul>
//     <!-- </nav> -->
//   </div>

// </div>
// </aside>
// <!-- 
//   <aside class="bd-aside sticky-xl-top text-muted align-self-start mb-3 mb-xl-5 px-2">
//     <h2 class="h6 pt-4 pb-3 mb-4 border-bottom">Subjects</h2>
//     <nav class="small" id="toc">
//       <ul class="list-unstyled">
//         <li class="my-2">
//           <button class="btn d-inline-flex align-items-center collapsed" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#contents-collapse" aria-controls="contents-collapse">Contents</button>
//           <ul class="list-unstyled ps-3 collapse" id="contents-collapse">
//             <li><a class="d-inline-flex align-items-center rounded" href="#typography">Typography</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#images">Images</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#tables">Tables</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#figures">Figures</a></li>
//           </ul>
//         </li>
//         <li class="my-2">
//           <button class="btn d-inline-flex align-items-center collapsed" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#forms-collapse" aria-controls="forms-collapse">Forms</button>
//           <ul class="list-unstyled ps-3 collapse" id="forms-collapse">
//             <li><a class="d-inline-flex align-items-center rounded" href="#overview">Overview</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#disabled-forms">Disabled forms</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#sizing">Sizing</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#input-group">Input group</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#floating-labels">Floating labels</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#validation">Validation</a></li>
//           </ul>
//         </li>
//         <li class="my-2">
//           <button class="btn d-inline-flex align-items-center collapsed" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#components-collapse" aria-controls="components-collapse">Components</button>
//           <ul class="list-unstyled ps-3 collapse" id="components-collapse">
//             <li><a class="d-inline-flex align-items-center rounded" href="#accordion">Accordion</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#alerts">Alerts</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#badge">Badge</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#breadcrumb">Breadcrumb</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#buttons">Buttons</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#button-group">Button group</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#card">Card</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#carousel">Carousel</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#dropdowns">Dropdowns</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#list-group">List group</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#modal">Modal</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#navs">Navs</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#navbar">Navbar</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#pagination">Pagination</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#popovers">Popovers</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#progress">Progress</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#scrollspy">Scrollspy</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#spinners">Spinners</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#toasts">Toasts</a></li>
//             <li><a class="d-inline-flex align-items-center rounded" href="#tooltips">Tooltips</a></li>
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   </aside> -->


//   <!-- Modal --><div class="modal fade" id="staticBackdrop" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         <h5>Popover in a modal</h5>
//         <p>This <a href="#" role="button" class="btn btn-secondary popover-test" title="Popover title" data-bs-content="Popover body content is set in this attribute.">button</a> triggers a popover on click.</p>
//         <hr>
//         <h5>Tooltips in a modal</h5>
//         <p><a href="#" class="tooltip-test" title="Tooltip">This link</a> and <a href="#" class="tooltip-test" title="Tooltip">that link</a> have tooltips on hover.</p>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Understood</button>
//       </div>
//     </div>
//   </div>
// </div>


// <button type="submit" (click)="configureip()"  style="width: 100px;">Update IP</button>

   //this.user.firstName= this.user.email.substring(0, this.user.email.indexOf("@"));
    //  this.fullName= this.user.firstName;
     // if(this.fullName.indexOf(".") >= 0){
      //  this.user.firstName= this.fullName.substring(0, this.fullName.indexOf("."));
     //   this.user.lastName= this.fullName.substring(this.fullName.indexOf(".")+1);
      //}
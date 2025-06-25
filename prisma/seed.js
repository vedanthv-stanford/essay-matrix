"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();

// Use the unified college database structure (hardcoded for seed file)
const colleges = [
    // Ivy League
  { name: 'Harvard University', domain: 'harvard.edu', location: 'Cambridge, MA', type: 'Private', acceptanceRate: 4.6, tuition: 54768, enrollment: 31200 },
  { name: 'Yale University', domain: 'yale.edu', location: 'New Haven, CT', type: 'Private', acceptanceRate: 6.2, tuition: 59950, enrollment: 12300 },
  { name: 'Princeton University', domain: 'princeton.edu', location: 'Princeton, NJ', type: 'Private', acceptanceRate: 5.8, tuition: 57410, enrollment: 8200 },
  { name: 'Columbia University', domain: 'columbia.edu', location: 'New York, NY', type: 'Private', acceptanceRate: 6.1, tuition: 65000, enrollment: 31200 },
  { name: 'University of Pennsylvania', domain: 'upenn.edu', location: 'Philadelphia, PA', type: 'Private', acceptanceRate: 8.4, tuition: 61710, enrollment: 21600 },
  { name: 'Brown University', domain: 'brown.edu', location: 'Providence, RI', type: 'Private', acceptanceRate: 7.1, tuition: 62680, enrollment: 10200 },
  { name: 'Dartmouth College', domain: 'dartmouth.edu', location: 'Hanover, NH', type: 'Private', acceptanceRate: 8.8, tuition: 60870, enrollment: 6500 },
  { name: 'Cornell University', domain: 'cornell.edu', location: 'Ithaca, NY', type: 'Private', acceptanceRate: 10.6, tuition: 61815, enrollment: 24000 },
  
  // Top Private Universities
  { name: 'Stanford University', domain: 'stanford.edu', location: 'Stanford, CA', type: 'Private', acceptanceRate: 4.3, tuition: 56169, enrollment: 17000 },
  { name: 'Massachusetts Institute of Technology', domain: 'mit.edu', location: 'Cambridge, MA', type: 'Private', acceptanceRate: 6.7, tuition: 57786, enrollment: 11500 },
  { name: 'California Institute of Technology', domain: 'caltech.edu', location: 'Pasadena, CA', type: 'Private', acceptanceRate: 6.4, tuition: 56000, enrollment: 2200 },
  { name: 'University of Chicago', domain: 'uchicago.edu', location: 'Chicago, IL', type: 'Private', acceptanceRate: 6.2, tuition: 61781, enrollment: 17000 },
  { name: 'Northwestern University', domain: 'northwestern.edu', location: 'Evanston, IL', type: 'Private', acceptanceRate: 7.2, tuition: 60000, enrollment: 22000 },
  { name: 'Duke University', domain: 'duke.edu', location: 'Durham, NC', type: 'Private', acceptanceRate: 7.7, tuition: 60488, enrollment: 17000 },
  { name: 'Johns Hopkins University', domain: 'jhu.edu', location: 'Baltimore, MD', type: 'Private', acceptanceRate: 11.2, tuition: 58720, enrollment: 28000 },
  { name: 'Vanderbilt University', domain: 'vanderbilt.edu', location: 'Nashville, TN', type: 'Private', acceptanceRate: 9.1, tuition: 56050, enrollment: 13000 },
  { name: 'Rice University', domain: 'rice.edu', location: 'Houston, TX', type: 'Private', acceptanceRate: 9.5, tuition: 54000, enrollment: 7000 },
  { name: 'Emory University', domain: 'emory.edu', location: 'Atlanta, GA', type: 'Private', acceptanceRate: 15.8, tuition: 55000, enrollment: 15000 },
  { name: 'Wake Forest University', domain: 'wfu.edu', location: 'Winston-Salem, NC', type: 'Private', acceptanceRate: 29.4, tuition: 58000, enrollment: 8000 },
  { name: 'Tufts University', domain: 'tufts.edu', location: 'Medford, MA', type: 'Private', acceptanceRate: 14.6, tuition: 62000, enrollment: 12000 },
  { name: 'Brandeis University', domain: 'brandeis.edu', location: 'Waltham, MA', type: 'Private', acceptanceRate: 33.5, tuition: 60000, enrollment: 5800 },
  { name: 'Case Western Reserve University', domain: 'case.edu', location: 'Cleveland, OH', type: 'Private', acceptanceRate: 27.4, tuition: 55000, enrollment: 12000 },
  { name: 'Lehigh University', domain: 'www2.lehigh.edu', location: 'Bethlehem, PA', type: 'Private', acceptanceRate: 46.1, tuition: 58000, enrollment: 7000 },
  { name: 'Villanova University', domain: 'villanova.edu', location: 'Villanova, PA', type: 'Private', acceptanceRate: 28.2, tuition: 58000, enrollment: 11000 },
  { name: 'Rensselaer Polytechnic Institute', domain: 'rpi.edu', location: 'Troy, NY', type: 'Private', acceptanceRate: 47.0, tuition: 58000, enrollment: 7500 },
  { name: 'Worcester Polytechnic Institute', domain: 'wpi.edu', location: 'Worcester, MA', type: 'Private', acceptanceRate: 59.4, tuition: 55000, enrollment: 7000 },
  { name: 'Stevens Institute of Technology', domain: 'stevens.edu', location: 'Hoboken, NJ', type: 'Private', acceptanceRate: 52.7, tuition: 56000, enrollment: 7000 },
  { name: 'Carnegie Mellon University', domain: 'cmu.edu', location: 'Pittsburgh, PA', type: 'Private', acceptanceRate: 15.4, tuition: 58000, enrollment: 16000 },
  { name: 'New York University', domain: 'nyu.edu', location: 'New York, NY', type: 'Private', acceptanceRate: 16.2, tuition: 58000, enrollment: 52000 },
  { name: 'Boston University', domain: 'bu.edu', location: 'Boston, MA', type: 'Private', acceptanceRate: 18.9, tuition: 61000, enrollment: 36000 },
  { name: 'Boston College', domain: 'bc.edu', location: 'Chestnut Hill, MA', type: 'Private', acceptanceRate: 19.0, tuition: 62000, enrollment: 15000 },
  { name: 'Georgetown University', domain: 'georgetown.edu', location: 'Washington, DC', type: 'Private', acceptanceRate: 14.5, tuition: 62000, enrollment: 19000 },
  { name: 'University of Notre Dame', domain: 'nd.edu', location: 'Notre Dame, IN', type: 'Private', acceptanceRate: 15.1, tuition: 58000, enrollment: 12500 },
  { name: 'Washington University in St. Louis', domain: 'wustl.edu', location: 'St. Louis, MO', type: 'Private', acceptanceRate: 13.0, tuition: 58000, enrollment: 17000 },
  { name: 'University of Southern California', domain: 'usc.edu', location: 'Los Angeles, CA', type: 'Private', acceptanceRate: 11.4, tuition: 64000, enrollment: 48000 },
  { name: 'Pepperdine University', domain: 'pepperdine.edu', location: 'Malibu, CA', type: 'Private', acceptanceRate: 32.7, tuition: 62000, enrollment: 7800 },
  { name: 'Loyola Marymount University', domain: 'lmu.edu', location: 'Los Angeles, CA', type: 'Private', acceptanceRate: 44.0, tuition: 54000, enrollment: 10000 },
  { name: 'Santa Clara University', domain: 'scu.edu', location: 'Santa Clara, CA', type: 'Private', acceptanceRate: 48.0, tuition: 56000, enrollment: 9000 },
  { name: 'University of San Francisco', domain: 'usfca.edu', location: 'San Francisco, CA', type: 'Private', acceptanceRate: 70.0, tuition: 52000, enrollment: 11000 },
  { name: 'University of San Diego', domain: 'sandiego.edu', location: 'San Diego, CA', type: 'Private', acceptanceRate: 49.0, tuition: 54000, enrollment: 9000 },
  
  // University of California System
  { name: 'University of California, Berkeley', domain: 'berkeley.edu', location: 'Berkeley, CA', type: 'Public', acceptanceRate: 14.4, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 42000 },
  { name: 'University of California, Los Angeles', domain: 'ucla.edu', location: 'Los Angeles, CA', type: 'Public', acceptanceRate: 10.8, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 45000 },
  { name: 'University of California, San Diego', domain: 'ucsd.edu', location: 'La Jolla, CA', type: 'Public', acceptanceRate: 34.3, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 42000 },
  { name: 'University of California, Davis', domain: 'ucdavis.edu', location: 'Davis, CA', type: 'Public', acceptanceRate: 46.3, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 39000 },
  { name: 'University of California, Irvine', domain: 'uci.edu', location: 'Irvine, CA', type: 'Public', acceptanceRate: 28.9, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 36000 },
  { name: 'University of California, Santa Barbara', domain: 'ucsb.edu', location: 'Santa Barbara, CA', type: 'Public', acceptanceRate: 29.2, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 26000 },
  { name: 'University of California, Santa Cruz', domain: 'ucsc.edu', location: 'Santa Cruz, CA', type: 'Public', acceptanceRate: 58.8, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 19000 },
  { name: 'University of California, Riverside', domain: 'ucr.edu', location: 'Riverside, CA', type: 'Public', acceptanceRate: 66.0, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 26000 },
  { name: 'University of California, Merced', domain: 'ucmerced.edu', location: 'Merced, CA', type: 'Public', acceptanceRate: 72.0, tuitionInState: 44115, tuitionOutOfState: 44115, enrollment: 9000 },
  
    // Top Public Universities
  { name: 'University of Michigan', domain: 'umich.edu', location: 'Ann Arbor, MI', type: 'Public', acceptanceRate: 20.2, tuitionInState: 52766, tuitionOutOfState: 52766, enrollment: 48000 },
  { name: 'University of Virginia', domain: 'virginia.edu', location: 'Charlottesville, VA', type: 'Public', acceptanceRate: 20.7, tuitionInState: 54000, tuitionOutOfState: 54000, enrollment: 25000 },
  { name: 'University of North Carolina at Chapel Hill', domain: 'unc.edu', location: 'Chapel Hill, NC', type: 'Public', acceptanceRate: 19.2, tuitionInState: 37000, tuitionOutOfState: 37000, enrollment: 30000 },
  { name: 'University of Texas at Austin', domain: 'utexas.edu', location: 'Austin, TX', type: 'Public', acceptanceRate: 31.8, tuitionInState: 40000, tuitionOutOfState: 40000, enrollment: 52000 },
  { name: 'University of Texas at Dallas', domain: 'utdallas.edu', location: 'Richardson, TX', type: 'Public', acceptanceRate: 79.0, tuitionInState: 14000, tuitionOutOfState: 40000, enrollment: 30000 },
  { name: 'Texas A&M University', domain: 'tamu.edu', location: 'College Station, TX', type: 'Public', acceptanceRate: 63.0, tuitionInState: 12000, tuitionOutOfState: 40000, enrollment: 70000 },
  { name: 'University of Wisconsin-Madison', domain: 'wisc.edu', location: 'Madison, WI', type: 'Public', acceptanceRate: 51.7, tuitionInState: 39000, tuitionOutOfState: 39000, enrollment: 45000 },
  { name: 'University of Illinois at Urbana-Champaign', domain: 'illinois.edu', location: 'Urbana, IL', type: 'Public', acceptanceRate: 59.7, tuitionInState: 34000, tuitionOutOfState: 34000, enrollment: 52000 },
  { name: 'University of Washington', domain: 'washington.edu', location: 'Seattle, WA', type: 'Public', acceptanceRate: 53.5, tuitionInState: 39000, tuitionOutOfState: 39000, enrollment: 48000 },
  { name: 'University of Florida', domain: 'ufl.edu', location: 'Gainesville, FL', type: 'Public', acceptanceRate: 30.1, tuitionInState: 28000, tuitionOutOfState: 28000, enrollment: 52000 },
  { name: 'University of Georgia', domain: 'uga.edu', location: 'Athens, GA', type: 'Public', acceptanceRate: 40.0, tuitionInState: 31000, tuitionOutOfState: 31000, enrollment: 39000 },
  { name: 'University of Maryland', domain: 'umd.edu', location: 'College Park, MD', type: 'Public', acceptanceRate: 44.2, tuitionInState: 39000, tuitionOutOfState: 39000, enrollment: 41000 },
  { name: 'Georgia Institute of Technology', domain: 'gatech.edu', location: 'Atlanta, GA', type: 'Public', acceptanceRate: 21.3, tuitionInState: 33000, tuitionOutOfState: 33000, enrollment: 32000 },
  { name: 'University of Minnesota', domain: 'umn.edu', location: 'Minneapolis, MN', type: 'Public', acceptanceRate: 70.0, tuitionInState: 33000, tuitionOutOfState: 33000, enrollment: 52000 },
  { name: 'University of Colorado Boulder', domain: 'colorado.edu', location: 'Boulder, CO', type: 'Public', acceptanceRate: 78.9, tuitionInState: 38000, tuitionOutOfState: 38000, enrollment: 37000 },
  { name: 'University of Arizona', domain: 'arizona.edu', location: 'Tucson, AZ', type: 'Public', acceptanceRate: 84.6, tuitionInState: 36000, tuitionOutOfState: 36000, enrollment: 45000 },
  { name: 'Arizona State University', domain: 'asu.edu', location: 'Tempe, AZ', type: 'Public', acceptanceRate: 88.2, tuitionInState: 30000, tuitionOutOfState: 30000, enrollment: 74000 },
  { name: 'University of Oregon', domain: 'uoregon.edu', location: 'Eugene, OR', type: 'Public', acceptanceRate: 83.4, tuitionInState: 39000, tuitionOutOfState: 39000, enrollment: 22000 },
  { name: 'University of Utah', domain: 'utah.edu', location: 'Salt Lake City, UT', type: 'Public', acceptanceRate: 79.4, tuitionInState: 28000, tuitionOutOfState: 28000, enrollment: 33000 },
  { name: 'University of Iowa', domain: 'uiowa.edu', location: 'Iowa City, IA', type: 'Public', acceptanceRate: 83.5, tuitionInState: 31000, tuitionOutOfState: 31000, enrollment: 32000 },
  { name: 'University of Kansas', domain: 'ku.edu', location: 'Lawrence, KS', type: 'Public', acceptanceRate: 92.5, tuitionInState: 28000, tuitionOutOfState: 28000, enrollment: 28000 },
  { name: 'University of Connecticut', domain: 'uconn.edu', location: 'Storrs, CT', type: 'Public', acceptanceRate: 48.8, tuitionInState: 41000, tuitionOutOfState: 41000, enrollment: 27000 },
  { name: 'University of Delaware', domain: 'udel.edu', location: 'Newark, DE', type: 'Public', acceptanceRate: 66.4, tuitionInState: 36000, tuitionOutOfState: 36000, enrollment: 24000 },
  { name: 'University of Massachusetts Amherst', domain: 'umass.edu', location: 'Amherst, MA', type: 'Public', acceptanceRate: 63.8, tuitionInState: 37000, tuitionOutOfState: 37000, enrollment: 32000 },
  { name: 'University of New Hampshire', domain: 'unh.edu', location: 'Durham, NH', type: 'Public', acceptanceRate: 84.2, tuitionInState: 36000, tuitionOutOfState: 36000, enrollment: 15000 },
  { name: 'University of Rhode Island', domain: 'uri.edu', location: 'Kingston, RI', type: 'Public', acceptanceRate: 75.5, tuitionInState: 34000, tuitionOutOfState: 34000, enrollment: 18000 },
  { name: 'University of Vermont', domain: 'uvm.edu', location: 'Burlington, VT', type: 'Public', acceptanceRate: 67.3, tuitionInState: 43000, tuitionOutOfState: 43000, enrollment: 13000 },
  { name: 'University of Maine', domain: 'umaine.edu', location: 'Orono, ME', type: 'Public', acceptanceRate: 90.8, tuitionInState: 32000, tuitionOutOfState: 32000, enrollment: 12000 },
  { name: 'University of New Mexico', domain: 'unm.edu', location: 'Albuquerque, NM', type: 'Public', acceptanceRate: 96.7, tuitionInState: 25000, tuitionOutOfState: 25000, enrollment: 26000 },
  { name: 'University of Nevada, Las Vegas', domain: 'unlv.edu', location: 'Las Vegas, NV', type: 'Public', acceptanceRate: 81.0, tuitionInState: 25000, tuitionOutOfState: 25000, enrollment: 31000 },
  { name: 'University of Nevada, Reno', domain: 'unr.edu', location: 'Reno, NV', type: 'Public', acceptanceRate: 88.0, tuitionInState: 25000, tuitionOutOfState: 25000, enrollment: 21000 },
  { name: 'University of Wyoming', domain: 'uwyo.edu', location: 'Laramie, WY', type: 'Public', acceptanceRate: 96.0, tuitionInState: 20000, tuitionOutOfState: 20000, enrollment: 12000 },
  { name: 'University of Montana', domain: 'umt.edu', location: 'Missoula, MT', type: 'Public', acceptanceRate: 95.0, tuitionInState: 25000, tuitionOutOfState: 25000, enrollment: 10000 },
  { name: 'University of Idaho', domain: 'uidaho.edu', location: 'Moscow, ID', type: 'Public', acceptanceRate: 78.0, tuitionInState: 25000, tuitionOutOfState: 25000, enrollment: 12000 },
  { name: 'University of Alaska', domain: 'alaska.edu', location: 'Fairbanks, AK', type: 'Public', acceptanceRate: 67.0, tuitionInState: 20000, tuitionOutOfState: 20000, enrollment: 8000 },
  
    // Liberal Arts Colleges
  { name: 'Williams College', domain: 'williams.edu', location: 'Williamstown, MA', type: 'Liberal Arts', acceptanceRate: 12.6, tuition: 61050, enrollment: 2100 },
  { name: 'Amherst College', domain: 'amherst.edu', location: 'Amherst, MA', type: 'Liberal Arts', acceptanceRate: 11.3, tuition: 61000, enrollment: 1850 },
  { name: 'Swarthmore College', domain: 'swarthmore.edu', location: 'Swarthmore, PA', type: 'Liberal Arts', acceptanceRate: 8.9, tuition: 56000, enrollment: 1600 },
  { name: 'Pomona College', domain: 'pomona.edu', location: 'Claremont, CA', type: 'Liberal Arts', acceptanceRate: 6.6, tuition: 56000, enrollment: 1700 },
  { name: 'Wellesley College', domain: 'wellesley.edu', location: 'Wellesley, MA', type: 'Liberal Arts', acceptanceRate: 16.2, tuition: 61000, enrollment: 2400 },
  { name: 'Bowdoin College', domain: 'bowdoin.edu', location: 'Brunswick, ME', type: 'Liberal Arts', acceptanceRate: 9.1, tuition: 58000, enrollment: 1800 },
  { name: 'Carleton College', domain: 'carleton.edu', location: 'Northfield, MN', type: 'Liberal Arts', acceptanceRate: 18.2, tuition: 58000, enrollment: 2000 },
  { name: 'Middlebury College', domain: 'middlebury.edu', location: 'Middlebury, VT', type: 'Liberal Arts', acceptanceRate: 15.7, tuition: 60000, enrollment: 2600 },
  { name: 'Davidson College', domain: 'davidson.edu', location: 'Davidson, NC', type: 'Liberal Arts', acceptanceRate: 17.8, tuition: 55000, enrollment: 1900 },
  { name: 'Colgate University', domain: 'colgate.edu', location: 'Hamilton, NY', type: 'Liberal Arts', acceptanceRate: 17.2, tuition: 61000, enrollment: 3000 },
  { name: 'Hamilton College', domain: 'hamilton.edu', location: 'Clinton, NY', type: 'Liberal Arts', acceptanceRate: 16.4, tuition: 60000, enrollment: 2000 },
  { name: 'Bates College', domain: 'bates.edu', location: 'Lewiston, ME', type: 'Liberal Arts', acceptanceRate: 17.3, tuition: 58000, enrollment: 1800 },
  { name: 'Colby College', domain: 'colby.edu', location: 'Waterville, ME', type: 'Liberal Arts', acceptanceRate: 8.9, tuition: 61000, enrollment: 2000 },
  { name: 'Oberlin College', domain: 'oberlin.edu', location: 'Oberlin, OH', type: 'Liberal Arts', acceptanceRate: 33.8, tuition: 58000, enrollment: 2900 },
  { name: 'Grinnell College', domain: 'grinnell.edu', location: 'Grinnell, IA', type: 'Liberal Arts', acceptanceRate: 23.2, tuition: 58000, enrollment: 1700 },
  { name: 'Kenyon College', domain: 'kenyon.edu', location: 'Gambier, OH', type: 'Liberal Arts', acceptanceRate: 34.3, tuition: 62000, enrollment: 1700 },
  { name: 'Vassar College', domain: 'vassar.edu', location: 'Poughkeepsie, NY', type: 'Liberal Arts', acceptanceRate: 23.7, tuition: 62000, enrollment: 2500 },
  { name: 'Barnard College', domain: 'barnard.edu', location: 'New York, NY', type: 'Liberal Arts', acceptanceRate: 11.8, tuition: 62000, enrollment: 2600 },
  { name: 'Smith College', domain: 'smith.edu', location: 'Northampton, MA', type: 'Liberal Arts', acceptanceRate: 30.0, tuition: 58000, enrollment: 2500 },
  { name: 'Mount Holyoke College', domain: 'mtholyoke.edu', location: 'South Hadley, MA', type: 'Liberal Arts', acceptanceRate: 38.0, tuition: 58000, enrollment: 2200 },
  { name: 'Bryn Mawr College', domain: 'brynmawr.edu', location: 'Bryn Mawr, PA', type: 'Liberal Arts', acceptanceRate: 33.0, tuition: 58000, enrollment: 1700 },
  { name: 'Haverford College', domain: 'haverford.edu', location: 'Haverford, PA', type: 'Liberal Arts', acceptanceRate: 18.0, tuition: 62000, enrollment: 1400 },
  { name: 'Scripps College', domain: 'scrippscollege.edu', location: 'Claremont, CA', type: 'Liberal Arts', acceptanceRate: 24.0, tuition: 62000, enrollment: 1100 },
  { name: 'Claremont McKenna College', domain: 'cmc.edu', location: 'Claremont, CA', type: 'Liberal Arts', acceptanceRate: 10.0, tuition: 62000, enrollment: 1400 },
  { name: 'Harvey Mudd College', domain: 'hmc.edu', location: 'Claremont, CA', type: 'Liberal Arts', acceptanceRate: 13.0, tuition: 62000, enrollment: 900 },
  { name: 'Pitzer College', domain: 'pitzer.edu', location: 'Claremont, CA', type: 'Liberal Arts', acceptanceRate: 18.0, tuition: 62000, enrollment: 1100 },
  { name: 'Reed College', domain: 'reed.edu', location: 'Portland, OR', type: 'Liberal Arts', acceptanceRate: 35.0, tuition: 62000, enrollment: 1400 },
  { name: 'Lewis & Clark College', domain: 'lclark.edu', location: 'Portland, OR', type: 'Liberal Arts', acceptanceRate: 78.0, tuition: 52000, enrollment: 2000 },
  { name: 'Occidental College', domain: 'oxy.edu', location: 'Los Angeles, CA', type: 'Liberal Arts', acceptanceRate: 37.0, tuition: 62000, enrollment: 2000 },
  { name: 'Whitman College', domain: 'whitman.edu', location: 'Walla Walla, WA', type: 'Liberal Arts', acceptanceRate: 50.0, tuition: 58000, enrollment: 1500 },
  { name: 'Colorado College', domain: 'coloradocollege.edu', location: 'Colorado Springs, CO', type: 'Liberal Arts', acceptanceRate: 13.0, tuition: 62000, enrollment: 2100 },
  { name: 'Macalester College', domain: 'macalester.edu', location: 'St. Paul, MN', type: 'Liberal Arts', acceptanceRate: 31.0, tuition: 62000, enrollment: 2100 },
  { name: 'St. Olaf College', domain: 'stolaf.edu', location: 'Northfield, MN', type: 'Liberal Arts', acceptanceRate: 48.0, tuition: 52000, enrollment: 3000 },
  { name: 'Gustavus Adolphus College', domain: 'gustavus.edu', location: 'St. Peter, MN', type: 'Liberal Arts', acceptanceRate: 65.0, tuition: 48000, enrollment: 2200 },
  { name: 'St. John\'s University', domain: 'csbsju.edu', location: 'Collegeville, MN', type: 'Liberal Arts', acceptanceRate: 80.0, tuition: 48000, enrollment: 1800 },
  { name: 'University of St. Thomas', domain: 'stthomas.edu', location: 'St. Paul, MN', type: 'Liberal Arts', acceptanceRate: 85.0, tuition: 48000, enrollment: 10000 },
  // Additional Public Universities
  { name: "University of Central Florida", domain: "ucf.edu", location: "Orlando, FL", type: "Public", acceptanceRate: 44.0, tuitionInState: 22000, tuitionOutOfState: 22000, enrollment: 72000 },
  { name: "Ohio State University", domain: "osu.edu", location: "Columbus, OH", type: "Public", acceptanceRate: 53.7, tuitionInState: 35000, tuitionOutOfState: 35000, enrollment: 61000 },
  { name: "Michigan State University", domain: "msu.edu", location: "East Lansing, MI", type: "Public", acceptanceRate: 76.0, tuitionInState: 40000, tuitionOutOfState: 40000, enrollment: 50000 },
  { name: "Florida State University", domain: "fsu.edu", location: "Tallahassee, FL", type: "Public", acceptanceRate: 32.0, tuitionInState: 22000, tuitionOutOfState: 22000, enrollment: 42000 },
  { name: "Florida International University", domain: "fiu.edu", location: "Miami, FL", type: "Public", acceptanceRate: 58.0, tuitionInState: 19000, tuitionOutOfState: 19000, enrollment: 58000 },
  { name: "Rutgers University", domain: "rutgers.edu", location: "New Brunswick, NJ", type: "Public", acceptanceRate: 60.1, tuitionInState: 32000, tuitionOutOfState: 32000, enrollment: 50000 },
  { name: "Pennsylvania State University", domain: "psu.edu", location: "University Park, PA", type: "Public", acceptanceRate: 54.2, tuitionInState: 36000, tuitionOutOfState: 36000, enrollment: 46000 },
  { name: "Indiana University Bloomington", domain: "indiana.edu", location: "Bloomington, IN", type: "Public", acceptanceRate: 78.0, tuitionInState: 28000, tuitionOutOfState: 28000, enrollment: 43000 },
  { name: "Purdue University", domain: "purdue.edu", location: "West Lafayette, IN", type: "Public", acceptanceRate: 60.0, tuitionInState: 28000, tuitionOutOfState: 28000, enrollment: 45000 },
  { name: "University of South Florida", domain: "usf.edu", location: "Tampa, FL", type: "Public", acceptanceRate: 48.0, tuitionInState: 17000, tuitionOutOfState: 17000, enrollment: 50000 },
  { name: "University of Houston", domain: "www.uh.edu", location: "Houston, TX", type: "Public", acceptanceRate: 65.0, tuitionInState: 11000, tuitionOutOfState: 27000, enrollment: 47000 },
  { name: "Louisiana State University", domain: "lsu.edu", location: "Baton Rouge, LA", type: "Public", acceptanceRate: 75.0, tuitionInState: 12000, tuitionOutOfState: 29000, enrollment: 35000 },
  { name: "University of Alabama", domain: "ua.edu", location: "Tuscaloosa, AL", type: "Public", acceptanceRate: 80.0, tuitionInState: 11000, tuitionOutOfState: 32000, enrollment: 38000 },
  { name: "University of Tennessee", domain: "utk.edu", location: "Knoxville, TN", type: "Public", acceptanceRate: 78.0, tuitionInState: 13000, tuitionOutOfState: 32000, enrollment: 30000 },
  { name: "Georgia State University", domain: "gsu.edu", location: "Atlanta, GA", type: "Public", acceptanceRate: 67.0, tuitionInState: 9000, tuitionOutOfState: 24000, enrollment: 52000 },
  { name: "University of Nebraska–Lincoln", domain: "unl.edu", location: "Lincoln, NE", type: "Public", acceptanceRate: 78.0, tuitionInState: 10000, tuitionOutOfState: 26000, enrollment: 26000 },
  { name: "Iowa State University", domain: "iastate.edu", location: "Ames, IA", type: "Public", acceptanceRate: 88.0, tuitionInState: 9000, tuitionOutOfState: 25000, enrollment: 32000 },
  { name: "University of Kentucky", domain: "uky.edu", location: "Lexington, KY", type: "Public", acceptanceRate: 96.0, tuitionInState: 12000, tuitionOutOfState: 32000, enrollment: 31000 },
  { name: "University of Mississippi", domain: "olemiss.edu", location: "Oxford, MS", type: "Public", acceptanceRate: 88.0, tuitionInState: 9000, tuitionOutOfState: 26000, enrollment: 22000 },
  { name: "University of North Texas", domain: "unt.edu", location: "Denton, TX", type: "Public", acceptanceRate: 74.0, tuitionInState: 11000, tuitionOutOfState: 23000, enrollment: 42000 },
  { name: "Texas State University", domain: "txstate.edu", location: "San Marcos, TX", type: "Public", acceptanceRate: 70.0, tuitionInState: 11000, tuitionOutOfState: 23000, enrollment: 38000 },
  { name: "University of Louisville", domain: "louisville.edu", location: "Louisville, KY", type: "Public", acceptanceRate: 72.0, tuitionInState: 12000, tuitionOutOfState: 28000, enrollment: 23000 },
  { name: "Clemson University", domain: "clemson.edu", location: "Clemson, SC", type: "Public", acceptanceRate: 49.0, tuitionInState: 15000, tuitionOutOfState: 39000, enrollment: 27000 },
  { name: "Colorado State University", domain: "colostate.edu", location: "Fort Collins, CO", type: "Public", acceptanceRate: 84.0, tuitionInState: 12000, tuitionOutOfState: 32000, enrollment: 34000 },
  { name: "Oregon State University", domain: "oregonstate.edu", location: "Corvallis, OR", type: "Public", acceptanceRate: 82.0, tuitionInState: 12000, tuitionOutOfState: 33000, enrollment: 32000 },
  { name: "University of South Carolina", domain: "sc.edu", location: "Columbia, SC", type: "Public", acceptanceRate: 68.0, tuitionInState: 13000, tuitionOutOfState: 34000, enrollment: 35000 },
  { name: "Auburn University", domain: "auburn.edu", location: "Auburn, AL", type: "Public", acceptanceRate: 85.0, tuitionInState: 11000, tuitionOutOfState: 32000, enrollment: 31000 },
  { name: "University of Oklahoma", domain: "ou.edu", location: "Norman, OK", type: "Public", acceptanceRate: 80.0, tuitionInState: 12000, tuitionOutOfState: 25000, enrollment: 28000 },
  { name: "Oklahoma State University", domain: "okstate.edu", location: "Stillwater, OK", type: "Public", acceptanceRate: 70.0, tuitionInState: 10000, tuitionOutOfState: 25000, enrollment: 25000 },
  { name: "West Virginia University", domain: "wvu.edu", location: "Morgantown, WV", type: "Public", acceptanceRate: 84.0, tuitionInState: 9000, tuitionOutOfState: 26000, enrollment: 27000 },
  { name: "Kansas State University", domain: "k-state.edu", location: "Manhattan, KS", type: "Public", acceptanceRate: 95.0, tuitionInState: 10000, tuitionOutOfState: 26000, enrollment: 22000 },
  { name: "Wichita State University", domain: "wichita.edu", location: "Wichita, KS", type: "Public", acceptanceRate: 95.0, tuitionInState: 8000, tuitionOutOfState: 18000, enrollment: 16000 },
  { name: "Kent State University", domain: "kent.edu", location: "Kent, OH", type: "Public", acceptanceRate: 87.0, tuitionInState: 11000, tuitionOutOfState: 20000, enrollment: 28000 },
  { name: "Missouri State University", domain: "missouristate.edu", location: "Springfield, MO", type: "Public", acceptanceRate: 88.0, tuitionInState: 8000, tuitionOutOfState: 16000, enrollment: 24000 },
  { name: "University of Arkansas", domain: "uark.edu", location: "Fayetteville, AR", type: "Public", acceptanceRate: 77.0, tuitionInState: 10000, tuitionOutOfState: 26000, enrollment: 28000 },
  { name: "San Diego State University", domain: "sdsu.edu", location: "San Diego, CA", type: "Public", acceptanceRate: 34.0, tuitionInState: 8000, tuitionOutOfState: 20000, enrollment: 36000 },
  { name: "California State University, Fullerton", domain: "fullerton.edu", location: "Fullerton, CA", type: "Public", acceptanceRate: 67.0, tuitionInState: 7000, tuitionOutOfState: 19000, enrollment: 40000 },
  { name: "California State University, Long Beach", domain: "csulb.edu", location: "Long Beach, CA", type: "Public", acceptanceRate: 40.0, tuitionInState: 7000, tuitionOutOfState: 19000, enrollment: 38000 },
  { name: "California State University, Northridge", domain: "csun.edu", location: "Northridge, CA", type: "Public", acceptanceRate: 59.0, tuitionInState: 7000, tuitionOutOfState: 19000, enrollment: 40000 },
  { name: "California State University, Sacramento", domain: "csus.edu", location: "Sacramento, CA", type: "Public", acceptanceRate: 82.0, tuitionInState: 7000, tuitionOutOfState: 19000, enrollment: 31000 },
  { name: "University at Buffalo", domain: "buffalo.edu", location: "Buffalo, NY", type: "Public", acceptanceRate: 67.0, tuitionInState: 10000, tuitionOutOfState: 28000, enrollment: 32000 },
  { name: "Stony Brook University", domain: "stonybrook.edu", location: "Stony Brook, NY", type: "Public", acceptanceRate: 44.0, tuitionInState: 10000, tuitionOutOfState: 28000, enrollment: 26000 },
  { name: "University of Massachusetts Lowell", domain: "uml.edu", location: "Lowell, MA", type: "Public", acceptanceRate: 75.0, tuitionInState: 16000, tuitionOutOfState: 34000, enrollment: 18000 },
  { name: "University of Massachusetts Boston", domain: "umb.edu", location: "Boston, MA", type: "Public", acceptanceRate: 76.0, tuitionInState: 16000, tuitionOutOfState: 34000, enrollment: 16000 },
  { name: "Brooklyn College", domain: "brooklyn.cuny.edu", location: "Brooklyn, NY", type: "Public", acceptanceRate: 44.0, tuitionInState: 7000, tuitionOutOfState: 18000, enrollment: 18000 },
  { name: "Hunter College", domain: "hunter.cuny.edu", location: "New York, NY", type: "Public", acceptanceRate: 35.0, tuitionInState: 7000, tuitionOutOfState: 18000, enrollment: 24000 },
  { name: "Queens College", domain: "qc.cuny.edu", location: "Queens, NY", type: "Public", acceptanceRate: 48.0, tuitionInState: 7000, tuitionOutOfState: 18000, enrollment: 20000 },
  { name: "Baruch College", domain: "baruch.cuny.edu", location: "New York, NY", type: "Public", acceptanceRate: 43.0, tuitionInState: 7000, tuitionOutOfState: 18000, enrollment: 19000 },
  
    // Additional Private Universities
  { name: "Northeastern University", domain: "northeastern.edu", location: "Boston, MA", type: "Private", acceptanceRate: 18.1, tuition: 58000, enrollment: 22000 },
  { name: "Drexel University", domain: "drexel.edu", location: "Philadelphia, PA", type: "Private", acceptanceRate: 77.0, tuition: 57000, enrollment: 24000 },
  { name: "DePaul University", domain: "depaul.edu", location: "Chicago, IL", type: "Private", acceptanceRate: 68.0, tuition: 42000, enrollment: 22000 },
  { name: "Baylor University", domain: "baylor.edu", location: "Waco, TX", type: "Private", acceptanceRate: 45.0, tuition: 50000, enrollment: 20000 },
  { name: "Fordham University", domain: "fordham.edu", location: "New York, NY", type: "Private", acceptanceRate: 58.0, tuition: 56000, enrollment: 16000 },
  { name: "University of Miami", domain: "www.miami.edu", location: "Coral Gables, FL", type: "Private", acceptanceRate: 28.0, tuition: 54000, enrollment: 18000 },
  
  // Historically Black Colleges and Universities (HBCUs)
  { name: "Spelman College", domain: "spelman.edu", location: "Atlanta, GA", type: "Liberal Arts", acceptanceRate: 43.0, tuition: 29000, enrollment: 2100 },
  { name: "Howard University", domain: "howard.edu", location: "Washington, DC", type: "Private", acceptanceRate: 39.0, tuition: 28000, enrollment: 12000 },
  { name: "Hampton University", domain: "hamptonu.edu", location: "Hampton, VA", type: "Private", acceptanceRate: 36.0, tuition: 26000, enrollment: 4000 },
  { name: "Morehouse College", domain: "morehouse.edu", location: "Atlanta, GA", type: "Liberal Arts", acceptanceRate: 100.0, tuition: 28000, enrollment: 2200 },
  { name: "Tuskegee University", domain: "tuskegee.edu", location: "Tuskegee, AL", type: "Private", acceptanceRate: 52.0, tuition: 22000, enrollment: 3000 },
  { name: "Xavier University of Louisiana", domain: "xula.edu", location: "New Orleans, LA", type: "Private", acceptanceRate: 95.0, tuition: 24000, enrollment: 3200 },
  { name: "Fisk University", domain: "fisk.edu", location: "Nashville, TN", type: "Liberal Arts", acceptanceRate: 96.0, tuition: 22000, enrollment: 1000 },
  { name: "Florida A&M University", domain: "famu.edu", location: "Tallahassee, FL", type: "Public", acceptanceRate: 33.0, tuitionInState: 6000, tuitionOutOfState: 18000, enrollment: 10000 },
  { name: "North Carolina A&T State University", domain: "ncat.edu", location: "Greensboro, NC", type: "Public", acceptanceRate: 58.0, tuitionInState: 7000, tuitionOutOfState: 20000, enrollment: 12000 },
  { name: "Prairie View A&M University", domain: "pvamu.edu", location: "Prairie View, TX", type: "Public", acceptanceRate: 78.0, tuitionInState: 11000, tuitionOutOfState: 26000, enrollment: 9000 },
  { name: "Morgan State University", domain: "morgan.edu", location: "Baltimore, MD", type: "Public", acceptanceRate: 85.0, tuitionInState: 8000, tuitionOutOfState: 18000, enrollment: 8000 },
  { name: "Clark Atlanta University", domain: "cau.edu", location: "Atlanta, GA", type: "Private", acceptanceRate: 54.0, tuition: 25000, enrollment: 4000 },
];

// Essay prompts for major colleges
const essayPrompts = {
    'Harvard University': [
        { title: 'Intellectual Experience', prompt: 'Briefly describe an intellectual experience that was important to you.', wordLimit: 200, required: true, category: 'Supplemental', tips: ['Be specific about the experience', 'Show intellectual curiosity', 'Connect to your academic interests'] },
        { title: 'Personal Growth', prompt: 'How have you grown over the past four years?', wordLimit: 200, required: true, category: 'Supplemental', tips: ['Show growth', 'Be honest', 'Reflect on challenges'] }
    ],
    'Stanford University': [
        { title: 'What matters to you, and why?', prompt: 'What matters to you, and why?', wordLimit: 250, required: true, category: 'Supplemental', tips: ['Be authentic', 'Show your values', 'Connect to your experiences'] },
        { title: 'Extracurricular Activity', prompt: 'Briefly describe one of your extracurricular activities or work experiences.', wordLimit: 150, required: true, category: 'Supplemental', tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'] }
    ],
    'Yale University': [
        { title: 'Why Yale?', prompt: 'What is it about Yale that has led you to apply?', wordLimit: 125, required: true, category: 'Supplemental', tips: ['Be specific about Yale', 'Show genuine interest', 'Connect to your goals'] }
    ],
    'Princeton University': [
        { title: 'Princeton Supplement', prompt: 'Briefly describe how you have spent the last two summers.', wordLimit: 150, required: true, category: 'Supplemental', tips: ['Show growth and learning', 'Be honest about your activities', 'Connect to your interests'] }
    ],
    'Columbia University': [
        { title: 'Why Columbia?', prompt: 'Why are you interested in attending Columbia University?', wordLimit: 200, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'University of Pennsylvania': [
        { title: 'Why Penn?', prompt: 'How will you explore your intellectual and academic interests at the University of Pennsylvania?', wordLimit: 300, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Brown University': [
        { title: 'Why Brown?', prompt: 'Why are you drawn to the area(s) of study you indicated earlier in this application?', wordLimit: 250, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Dartmouth College': [
        { title: 'Why Dartmouth?', prompt: 'Why Dartmouth?', wordLimit: 100, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Cornell University': [
        { title: 'Why Cornell?', prompt: 'Why are you drawn to studying the major you have selected?', wordLimit: 650, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Massachusetts Institute of Technology': [
        { title: 'Why MIT?', prompt: 'Why are you interested in attending MIT?', wordLimit: 250, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'University of California, Berkeley': [
        { title: 'Personal Insight Questions', prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes, or contributed to group efforts over time.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role'] },
        { title: 'Personal Insight Questions', prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show creativity', 'Be specific', 'Connect to your interests'] }
    ],
    'University of California, Los Angeles': [
        { title: 'Personal Insight Questions', prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes, or contributed to group efforts over time.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role'] },
        { title: 'Personal Insight Questions', prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show creativity', 'Be specific', 'Connect to your interests'] }
    ],
    'University of Michigan': [
        { title: 'Why Michigan?', prompt: 'Describe the unique qualities that attract you to the specific undergraduate College or School (including preferred admission and dual degree programs) to which you are applying at the University of Michigan. How would that curriculum support your interests?', wordLimit: 550, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] },
        { title: 'Community Essay', prompt: 'Everyone belongs to many different communities and/or groups defined by (among other things) shared geography, religion, ethnicity, income, cuisine, interest, race, ideology, or intellectual heritage. Choose one of the communities to which you belong, and describe that community and your place within it.', wordLimit: 300, required: true, category: 'Supplemental', tips: ['Be specific about your community', 'Show your role and impact', 'Demonstrate belonging'] }
    ],
    'University of Virginia': [
        { title: 'Why UVA?', prompt: 'What about your individual background, perspective, or experience will serve as a source of strength for you or those around you at UVA?', wordLimit: 250, required: true, category: 'Why This School', tips: ['Show your unique perspective', 'Connect to UVA community', 'Demonstrate self-awareness'] }
    ],
    'University of North Carolina at Chapel Hill': [
        { title: 'Why UNC?', prompt: 'What do you hope will change about the place where you live?', wordLimit: 250, required: true, category: 'Supplemental', tips: ['Show civic engagement', 'Demonstrate problem-solving', 'Connect to your community'] }
    ],
    'University of Texas at Austin': [
        { title: 'Why UT Austin?', prompt: 'Why are you interested in the major you indicated as your first-choice major?', wordLimit: 500, required: true, category: 'Why This School', tips: ['Research the specific major', 'Show genuine interest', 'Connect to your background'] }
    ]
};

// Common App Essay Prompts
const commonAppPrompts = [
    { title: 'Background, Identity, Interest, or Talent', prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.', wordLimit: 650, required: false, category: 'Common App', tips: ['Be authentic', 'Show growth and reflection', 'Connect to your future goals'] },
    { title: 'Challenge, Setback, or Failure', prompt: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show resilience', 'Focus on learning and growth', 'Be honest about challenges'] },
    { title: 'Questioned or Challenged a Belief', prompt: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show critical thinking', 'Be respectful', 'Focus on the process, not just the outcome'] },
    { title: 'Gratitude', prompt: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show gratitude', 'Focus on impact', 'Connect to your character'] },
    { title: 'Personal Growth', prompt: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.', wordLimit: 650, required: false, category: 'Common App', tips: ['Show personal growth', 'Be specific about the event', 'Reflect on the impact'] },
    { title: 'Engaging Topic', prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show passion', 'Be specific', 'Show how you pursue knowledge'] },
    { title: 'Free Topic', prompt: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.', wordLimit: 650, required: false, category: 'Common App', tips: ['Choose a topic you\'re passionate about', 'Make it personal', 'Show your unique perspective'] }
];

function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting comprehensive database seeding...');
        // Create a test user if it doesn't exist
        const testUser = yield prisma.user.upsert({
            where: { email: 'test@example.com' },
            update: {},
            create: {
                email: 'test@example.com',
                name: 'Test User',
                graduationYear: 2025,
                highSchoolName: 'Test High School',
                intendedMajor: 'Computer Science',
            },
        });
        console.log('Test user created/updated:', testUser.email);
        // Seed Common App prompts (these are not tied to specific colleges)
        console.log('Seeding Common App essay prompts...');
        for (const prompt of commonAppPrompts) {
            yield prisma.essayPrompt.upsert({
                where: {
                    id: `common-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`
                },
                update: {},
                create: {
                    id: `common-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`,
                    title: prompt.title,
                    prompt: prompt.prompt,
                    wordLimit: prompt.wordLimit,
                    required: prompt.required,
                    category: prompt.category,
                    tips: JSON.stringify(prompt.tips),
                    year: '2024-2025',
                    collegeId: null // Common App prompts are not tied to specific colleges
                },
            });
        }
        // Seed colleges and their essay prompts
        console.log('Seeding colleges and essay prompts...');
        for (const collegeData of colleges) {
            // Create or update the college
            const college = yield prisma.college.upsert({
                where: {
                    id: `college-${collegeData.name.toLowerCase().replace(/\s+/g, '-')}`
                },
                update: {},
                create: {
                    id: `college-${collegeData.name.toLowerCase().replace(/\s+/g, '-')}`,
                    name: collegeData.name,
                    userId: testUser.id, // Associate with test user for now
                    status: 'In Progress',
                    location: collegeData.location,
                    type: collegeData.type,
                    acceptanceRate: collegeData.acceptanceRate,
                    tuition: collegeData.tuition,
                    enrollment: collegeData.enrollment,
                    priority: 1
                },
            });
            // Add essay prompts for this college if they exist
            const collegePrompts = essayPrompts[collegeData.name];
            if (collegePrompts) {
                for (const prompt of collegePrompts) {
                    yield prisma.essayPrompt.upsert({
                        where: {
                            id: `${college.id}-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`
                        },
                        update: {},
                        create: {
                            id: `${college.id}-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`,
                            title: prompt.title,
                            prompt: prompt.prompt,
                            wordLimit: prompt.wordLimit,
                            required: prompt.required,
                            category: prompt.category,
                            tips: JSON.stringify(prompt.tips),
                            year: '2024-2025',
                            collegeId: college.id
                        },
                    });
                }
            }
        }
        // Add some sample colleges for the test user
        const sampleColleges = [
            { name: 'Stanford University', status: 'In Progress', priority: 1 },
            { name: 'University of California, Berkeley', status: 'Applied', priority: 2 },
            { name: 'Massachusetts Institute of Technology', status: 'In Progress', priority: 3 },
        ];
        for (const collegeData of sampleColleges) {
            const collegeInfo = colleges.find(c => c.name === collegeData.name);
            if (collegeInfo) {
                yield prisma.college.upsert({
                    where: {
                        userId_name: {
                            userId: testUser.id,
                            name: collegeData.name,
                        },
                    },
                    update: {},
                    create: {
                        userId: testUser.id,
                        name: collegeData.name,
                        status: collegeData.status,
                        priority: collegeData.priority,
                        location: collegeInfo.location,
                        type: collegeInfo.type,
                        acceptanceRate: collegeInfo.acceptanceRate,
                        tuition: collegeInfo.tuition,
                        enrollment: collegeInfo.enrollment,
                    },
                });
            }
        }
        console.log('Sample colleges added for test user');
        console.log('Comprehensive seeding completed successfully!');
        console.log(`Seeded ${colleges.length} colleges with essay prompts`);
        console.log(`Seeded ${commonAppPrompts.length} Common App prompts`);
    });
}
main()
    .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));

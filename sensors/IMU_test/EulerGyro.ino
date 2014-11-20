
void EulerGyro(float p, float q, float r, float dt, float *phi, float *theta, float *psi)
{
  static float prevPhi;
  static float prevTheta;
  static float prevPsi;
   
  float sinPhi, cosPhi;
  float cosTheta, tanTheta;


  sinPhi = sin(prevPhi);
  cosPhi = cos(prevPhi);
  cosTheta = cos(prevTheta);
  tanTheta = tan(prevTheta);
  
  *phi   = prevPhi   + dt*(p + q*sinPhi*tanTheta + r*cosPhi*tanTheta);
  *theta = prevTheta + dt*(    q*cosPhi          - r*sinPhi);
  *psi   = prevPsi   + dt*(    q*sinPhi/cosTheta + r*cosPhi/cosTheta);
  
  prevPhi   = *phi;
  prevTheta = *theta; 
  prevPsi   = *psi;
}

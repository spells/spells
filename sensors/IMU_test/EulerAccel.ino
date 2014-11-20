
void EulerAccel(float ax, float ay, float *phi, float *theta)
{
  const float g = 9.8;
  float cosTheta;


  *theta = asin(ax / g);
  
  cosTheta = cos(*theta);
  *phi   = asin(-ay / (g*cosTheta));
}


